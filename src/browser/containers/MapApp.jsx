import { connect } from 'react-redux';

import {
  fetchMapIfNeeded,
} from '../../common/redux/actions/Map';

import MapComponent from '../components/mapComponent/MapComponent';

const mapStateToProps = (state) => {
  const {
    mapFeed,
  } = state;

  const items = 'items' in mapFeed ? mapFeed.items : [];
  const isFetching = 'isFetchingFeed' in mapFeed ? mapFeed.isFetchingFeed : true;
  return {
    items,
    isFetching,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMap: () => {
    dispatch(fetchMapIfNeeded());
  },
});

const MapApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapComponent);

export default MapApp;
