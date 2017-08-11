import {
  FETCH_MAP_REQUEST,
  FETCH_MAP_SUCCESS,
} from '../actions/Map';

function feedMapPosts(
  state = {
    isFetchingFeed: false,
    items: [],
  },
  action,
) {
  switch (action.type) {
    case FETCH_MAP_REQUEST:
      return Object.assign(
        {},
        state,
        {
          isFetchingFeed: true,
        },
      );
    case FETCH_MAP_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isFetchingFeed: false,
          items: action.posts,
        },
      );
    default:
      return state;
  }
}

function mapFeed(state = {}, action) {
  switch (action.type) {
    case FETCH_MAP_REQUEST:
    case FETCH_MAP_SUCCESS:
      return Object.assign(
        {},
        state,
        feedMapPosts(state, action),
      );
    default:
      return state;
  }
}

export default mapFeed;
