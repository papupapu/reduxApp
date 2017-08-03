import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from '../actions/Home';

function posts(
  state = {
    isFetching: false,
    items: [],
  },
  action,
) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return Object.assign(
        {},
        state,
        {
          isFetching: true,
        },
      );
    case FETCH_POSTS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          items: action.posts,
        },
      );
    default:
      return state;
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
    case FETCH_POSTS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          [action.category]: posts(state[action.category], action),
        },
      );
    default:
      return state;
  }
}

export default postsByCategory;
