import React from 'react';
import PropTypes from 'prop-types';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

import './MapComponent.css';

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={props.zoom}
    defaultCenter={props.coords}
  >
    <MarkerClusterer
      zoomOnClick={false}
      gridSize={1}
      onClick={(e) => { props.onClusterClick(e); }}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          title={marker.title}
          position={marker.position}
          onClick={(e) => { props.onMarkerClick(e, marker); }}
        />
      ))}
    </MarkerClusterer>
    {
      props.infoBoxData !== null &&
        <InfoBox
          position={props.infoBoxData.markerPosition}
          onCloseClick={() => { props.onCloseClick(); }}
          options={{
            closeBoxMargin: '10px',
            disableAutoPan: true,
            boxClass: props.infoBoxData.boxClass,
          }}
        >
          {props.infoBoxData.content}
        </InfoBox>
    }
    {
      props.infoWindowData !== null &&
        <InfoWindow
          onDomReady={() => { props.iwDOMReady(); }}
          position={props.infoWindowData.markerPosition}
          onCloseClick={() => { props.onCloseClick(); }}
          options={{
            disableAutoPan: true,
          }}
        >
          {props.infoWindowData.content}
        </InfoWindow>
    }
  </GoogleMap>
));

function fromLatLngToPixel(map, position) {
  var scale = Math.pow(2, map.getZoom());
  var proj = map.getProjection();
  var bounds = map.getBounds();

  var nw = proj.fromLatLngToPoint(
    new google.maps.LatLng(
      bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng()
    ));
  var point = proj.fromLatLngToPoint(position);

  return new google.maps.Point(
    Math.floor((point.x - nw.x) * scale),
    Math.floor((point.y - nw.y) * scale)
  );
}

function fromPixelToLatLng(map, pixel) {
  var scale = Math.pow(2, map.getZoom());
  var proj = map.getProjection();
  var bounds = map.getBounds();

  var nw = proj.fromLatLngToPoint(
    new google.maps.LatLng(
      bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng()
    ));
  var point = new google.maps.Point();

  point.x = pixel.x / scale + nw.x;
  point.y = pixel.y / scale + nw.y;

  return proj.fromPointToLatLng(point);
}

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
  isFetching: PropTypes.bool.isRequired,
};

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      articles: [],
      infoBoxData: null,
      infoWindowData: null,
    };

    this.validItems = [];

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.onClusterClick = this.onClusterClick.bind(this);
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.iwDOMReady = this.iwDOMReady.bind(this);
    this.selectMarkerById = this.selectMarkerById.bind(this);
  }
  componentWillMount() {
    const { fetchMap } = this.props;
    fetchMap();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching) {
      if (newProps.items && newProps.items.length > 0) {
        const items = newProps.items;
        this.validItems = items && items.length > 0 ?
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

        const box = createBBox(this.validItems, newProps.viewport.width, newProps.viewport.height);
        const markers = this.validItems.map(
          el => (
            {
              title: el.id,
              position: {
                lat: el.property.address.location.latitude,
                lng: el.property.address.location.longitude,
              },
              showInfo: false,
              infoContent: (
                <div className="casaitem">
                  <h1>{el.property.address.streetAddress}</h1>
                  <p className="infos">
                    <strong>{el.price.display}</strong>
                    {
                      el.property.features.general.landsize &&
                      <span>
                        {el.property.features.general.landsize.value}{' '}
                        <span className="label">mq</span>
                      </span>
                    }
                    {
                      el.property.features.general.rooms &&
                        <span>
                          {' '}|{' '}
                          {el.property.features.general.rooms.value}{' '}
                          <span className="label">locali</span>
                        </span>
                    }
                  </p>
                  <img className="pic" src={`${el.property.media._meta.server}/360x265${el.property.media.gallery[0].uri}`} alt={el.property.address.streetAddress} />
                </div>
              ),
            }
          ),
        );
        const articles = this.validItems.map(
          (el, index) => {
            return (
              <li key={`map-article-${index}`} onClick={() => { this.selectMarkerById(el.id); }}>
                <img className="pic" src={`${el.property.media._meta.server}/360x265${el.property.media.gallery[0].uri}`} alt={el.property.address.streetAddress} />
                <h1><a href="/">{el.property.address.streetAddress}</a></h1>
                <h2>{el.price.display}</h2>
                <p className="infos">
                  {
                    el.property.features.general.landsize &&
                    <span>
                      {el.property.features.general.landsize.value}{' '}
                      <span className="label">mq</span>
                    </span>
                  }
                  {
                    el.property.features.general.rooms &&
                      <span>
                        {' '}|{' '}
                        {el.property.features.general.rooms.value}{' '}
                        <span className="label">locali</span>
                      </span>
                  }
                </p>
              </li>
            );
          },
        );

        this.setState({
          box,
          markers,
          articles,
        });
      }
    }
  }

  handleMarkerClick(event, targetMarker) {
    const mapElementSize = document.querySelector('#map_holder').getBoundingClientRect();
    const markerPxPosition = fromLatLngToPixel(this._map, event.latLng);
    const infoBoxCorrectPxPosition = { x: markerPxPosition.x - 195, y: markerPxPosition.y - 385 };

    let boxClass = 'infoBox';

    if (markerPxPosition.x + 195 > mapElementSize.right) {
      infoBoxCorrectPxPosition.x = markerPxPosition.x - 397;
      infoBoxCorrectPxPosition.y = markerPxPosition.y - 203;
      boxClass = 'infoBox arrow-right';
    }

    if (markerPxPosition.x - 195 < 0) {
      infoBoxCorrectPxPosition.x = markerPxPosition.x + 13;
      infoBoxCorrectPxPosition.y = markerPxPosition.y - 203;
      boxClass = 'infoBox arrow-left';
    }

    if (markerPxPosition.y - 395 < 0) {
      if (boxClass.indexOf('right') > -1) {
        infoBoxCorrectPxPosition.x = markerPxPosition.x - 395;
        infoBoxCorrectPxPosition.y = markerPxPosition.y - 15;
      } else if (boxClass.indexOf('left') > -1) {
        infoBoxCorrectPxPosition.x = markerPxPosition.x + 15;
        infoBoxCorrectPxPosition.y = markerPxPosition.y - 15;
      } else {
        infoBoxCorrectPxPosition.y = markerPxPosition.y - 10;
        boxClass = 'infoBox arrow-up';
      }
    }

    const coords = fromPixelToLatLng(this._map, { x: infoBoxCorrectPxPosition.x, y: infoBoxCorrectPxPosition.y });
    const markerPosition = new google.maps.LatLng({ lat: coords.lat(), lng: coords.lng() });
    this.setState({ infoBoxData: { content: targetMarker.infoContent, markerPosition, boxClass }, infoWindowData: null });
  }

  handleCloseClick() {
    this.setState({ infoBoxData: null, infoWindowData: null });
  }

  onClusterClick(cluster) {
    const mapElementSize = document.querySelector('#map_holder').getBoundingClientRect();
    const markerPxPosition = fromLatLngToPixel(this._map, cluster.getCenter());
    const infoBoxCorrectPxPosition = { x: markerPxPosition.x, y: markerPxPosition.y };

    let boxClass = 'infoBox';
    /*
    if (markerPxPosition.x + 195 > mapElementSize.right) {
      infoBoxCorrectPxPosition.x = markerPxPosition.x - 397;
      infoBoxCorrectPxPosition.y = markerPxPosition.y - 203;
      boxClass = 'infoBox arrow-right';
    }

    if (markerPxPosition.x - 195 < 0) {
      infoBoxCorrectPxPosition.x = markerPxPosition.x + 13;
      infoBoxCorrectPxPosition.y = markerPxPosition.y - 203;
      boxClass = 'infoBox arrow-left';
    }
*/
    if (markerPxPosition.y - 395 < 0) {
      if (boxClass.indexOf('right') > -1) {
        infoBoxCorrectPxPosition.x = markerPxPosition.x - 395;
        infoBoxCorrectPxPosition.y = markerPxPosition.y - 15;
      } else if (boxClass.indexOf('left') > -1) {
        infoBoxCorrectPxPosition.x = markerPxPosition.x + 15;
        infoBoxCorrectPxPosition.y = markerPxPosition.y - 15;
      } else {
        infoBoxCorrectPxPosition.y = markerPxPosition.y + 421;
        boxClass = 'infoBox arrow-up';
      }
    }

    const markers = cluster.getMarkers();
    const clusterItems = [];
    markers.forEach(
      marker => clusterItems.push(marker.title),
    );
    let count = 0;
    const listItems = this.validItems.map(
      (el) => {
        if (clusterItems.indexOf(el.id) > -1) {
          count += 1;
          return (
            <li key={`cluster-item-${count}`}>
              <img className="pic" src={`${el.property.media._meta.server}/360x265${el.property.media.gallery[0].uri}`} alt={el.property.address.streetAddress} />
              <h1><a href="/">{el.property.address.streetAddress}</a></h1>
              <h2>{el.price.display}</h2>
              <p className="infos">
                {
                  el.property.features.general.landsize &&
                  <span>
                    {el.property.features.general.landsize.value}{' '}
                    <span className="label">mq</span>
                  </span>
                }
                {
                  el.property.features.general.rooms &&
                    <span>
                      {' '}|{' '}
                      {el.property.features.general.rooms.value}{' '}
                      <span className="label">locali</span>
                    </span>
                }
              </p>
            </li>
          );
        }
        return null;
      },
    );
    const iwHeight = count < 4 ? (count * 92) + 26 : (3 * 92) + 41;
    const content = (
      <div className="casaitem window" style={{ height: `${iwHeight}px` }}>
        <div className="scrollingContCont">
          <div className="scrollingCont">
            <ul>
              {listItems}
            </ul>
          </div>
        </div>
      </div>
    );
    const coords = fromPixelToLatLng(this._map, { x: infoBoxCorrectPxPosition.x, y: infoBoxCorrectPxPosition.y });
    const markerPosition = new google.maps.LatLng({ lat: coords.lat(), lng: coords.lng() });
    this.setState({ infoWindowData: { content, markerPosition, boxClass }, infoBoxData: null });
  }

  handleMapMounted(map) {
    this._map = map;
  }

  iwDOMReady() {
    document.querySelector('.gm-style-iw').parentNode.className = this.state.infoWindowData.boxClass;
  }

  /*

  TODO:
    click on list item opens correct infobox
*/
  selectMarkerById(id) {
    const marker = this.state.markers.filter(
      el => el.title === id,
    );
    console.log(marker[0]);
    const boxClass = 'infoBox';
    const myLatlng = new google.maps.LatLng(marker[0].position.lat,marker[0].position.lng);
    const markerPxPosition = fromLatLngToPixel(this._map, myLatlng);
    const infoBoxCorrectPxPosition = { x: markerPxPosition.x - 195, y: markerPxPosition.y - 385 };
    const coords = fromPixelToLatLng(this._map, { x: infoBoxCorrectPxPosition.x, y: infoBoxCorrectPxPosition.y });
    const markerPosition = new google.maps.LatLng({ lat: coords.lat(), lng: coords.lng() });    
    this.setState({ infoBoxData: { content: marker[0].infoContent, markerPosition, boxClass }, infoWindowData: null });
    //this.setState({ infoBoxData: { content: marker[0].infoContent, markerPosition, boxClass }, infoWindowData: null });
    /*
    _fromUser = false;

    const { list } = this.props;
    const itemIndex = findIndexByKeyValue(list, 'id', id);

    const { latitude, longitude } = list[itemIndex].address.location;

    // this.map.props.map.setZoom(21);
    // this.map.props.map.panTo(new google.maps.LatLng(latitude + 0.00011, longitude));

    const { markers } = this.state;
    const markerIndex = findIndexByKeyValue(markers, 'id', id);
    const marker = markers[markerIndex];

    this.setState({ infoShow: true, infoData: [marker], infoCenter: new google.maps.LatLng(marker.position.lat, marker.position.lng) });
    
    */
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
        isFullpage
        isDetail={false}
        pageTitle="Papui"
        modal={modal}
        modalData={modalData}
        modalType={modalType}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div className="casamap">
          <div id="list_holder">
            <ul>{this.state.articles}</ul>
          </div>
          <div id="map_holder" style={{ width: 'calc(100vw - 300px)', height: '100vh' }}>
            {
              !this.props.isFetching &&
                <GettingStartedGoogleMap
                  onMapMounted={this.handleMapMounted}
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
                  infoBoxData={this.state.infoBoxData}
                  infoWindowData={this.state.infoWindowData}
                  iwDOMReady={this.iwDOMReady}
                />
            }
          </div>
        </div>
      </Page>
    );
  }
}

MapComponent.propTypes = MapComponentPropTypes;
export default UIHandler(MapComponent);
