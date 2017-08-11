import React from 'react';
import PropTypes from 'prop-types';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.coords}
  >
    <MarkerClusterer
      zoomOnClick={false}
      gridSize={1}
      onClick={props.onClusterClick}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          title={marker.title}
          position={marker.position}
          onClick={() => { props.onMarkerClick(marker); }}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={() => { props.onCloseClick(marker); }}>
              <div>{marker.infoContent}</div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

function createBBox(items, mapWidth, mapHeight, buffer = 25) {
  let minLat = 85;
  let maxLat = -85;
  let minLon = 180;
  let maxLon = -180;
  items.forEach(
    (item) => {
      const el = item.property.address.location;
      if (el.latitude < minLat) {
        minLat = el.latitude;
      }
      if (el.latitude > maxLat) {
        maxLat = el.latitude;
      }
      if (el.longitude > maxLon) {
        maxLon = el.longitude;
      }
      if (el.longitude < minLon) {
        minLon = el.longitude;
      }
    },
  );
  let zoom1;
  let zoom2;
  if (maxLon !== minLon && maxLat !== minLat) {
    // best zoom level based on map width
    zoom1 = Math.log(360.0 / 256.0 * (mapWidth - 2*buffer) / (maxLon - minLon)) / Math.log(2);
    // best zoom level based on map height
    zoom2 = Math.log(180.0 / 256.0 * (mapHeight - 2*buffer) / (maxLat - minLat)) / Math.log(2);
  }

  //use the most zoomed out of the two zoom levels
  const zoomLevel = (zoom1 < zoom2) ? zoom1 : zoom2;
  
  return { lat: (minLat + maxLat) / 2, lon: (minLon + maxLon) / 2, zoom: Math.ceil(zoomLevel) };
}

const MapComponentPropTypes = {
  // ui specific
  device: PropTypes.string.isRequired,
  viewport: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
  // view specific
  items: PropTypes.instanceOf(Array).isRequired,
  fetchMap: PropTypes.func.isRequired,
};

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    };
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.onClusterClick = this.onClusterClick.bind(this);
  }
  componentWillMount() {
    const { fetchMap } = this.props;
    fetchMap();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching) {
      if (newProps.items && newProps.items.length > 0) {
        const items = newProps.items;
        const validItems = items && items.length > 0 ?
          items.filter(
            (el) => {
              if (el.property.address.location) {
                return el;
              }
              return null;
            },
          )
        :
          [];

        const box = createBBox(validItems, newProps.viewport.width, newProps.viewport.height);
        const markers = validItems.map(
          el => (
            {
              title: el.id,
              position: {
                lat: el.property.address.location.latitude,
                lng: el.property.address.location.longitude,
              },
              showInfo: false,
              infoContent: (<p>{el.id} - {el.property.address.streetAddress}</p>),
            }
          ),
        );
        this.setState({
          box,
          markers,
        });
      }
    }
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return Object.assign(
            {},
            marker,
            {
              showInfo: true,
            },
          );
        }
        return marker;
      }),
    });
  }

  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return Object.assign(
            {},
            marker,
            {
              showInfo: false,
            },
          );
        }
        return marker;
      }),
    });
  }

  onClusterClick(cluster) {
    const markers = cluster.getMarkers();
    markers.forEach(
      marker => console.log(marker.title)
    ),
  }

  render() {
    const {
      // ui specific
      modal,
      modalData,
      modalType,
      toggleSiteHiddenComponents,
    } = this.props;

    return (
      <Page
        isFullpage={true}
        isDetail={false}
        pageTitle="Papui"
        modal={modal}
        modalData={modalData}
        modalType={modalType}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div style={{ width: '100vw', height: '100vh' }}>
          {
            !this.props.isFetching &&
              <GettingStartedGoogleMap
                containerElement={
                  <div style={{ height: '100%' }} />
                }
                mapElement={
                  <div style={{ height: '100%' }} />
                }
                coords={{ lat: this.state.box.lat, lng: this.state.box.lon }}
                zoom={this.state.box.zoom}
                markers={this.state.markers}
                onMarkerClick={this.handleMarkerClick}
                onCloseClick={this.handleCloseClick}
                onClusterClick={this.onClusterClick}
              />
          }
        </div>
      </Page>
    );
  }
}

MapComponent.propTypes = MapComponentPropTypes;
export default UIHandler(MapComponent);
