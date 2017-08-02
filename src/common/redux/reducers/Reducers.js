import CHANNELS from '../../constants/Settings';

import {
  ADD_CHANNEL,
  SELECT_CHANNEL,
  INVALIDATE_CHANNEL,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from '../actions/Actions';

const initialChannelsState = {
  channels: CHANNELS,
};

export function channelList(state = initialChannelsState, action) {
  switch (action.type) {
    case ADD_CHANNEL:
      return Object.assign(
        {},
        state,
        {
          channels: state.channels.concat(action.channel),
        },
      );
    default:
      return state;
  }
}

export function selectedChannel(state = initialChannelsState.channels[0], action) {
  switch (action.type) {
    case SELECT_CHANNEL:
      return action.channel;
    default:
      return state;
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_CHANNEL:
      return Object.assign(
        {},
        state,
        {
          didInvalidate: true,
        },
      );
    case FETCH_POSTS_REQUEST:
      return Object.assign(
        {},
        state,
        {
          isFetching: true,
          didInvalidate: false,
        },
      );
    case FETCH_POSTS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          didInvalidate: false,
          items: action.posts,
          lastFetch: action.lastFetch,
        },
      );
    default:
      return state;
  }
}

export function postsByChannel(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CHANNEL:
    case FETCH_POSTS_REQUEST:
    case FETCH_POSTS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          [action.channel]: posts(state[action.channel], action),
        },
      );
    default:
      return state;
  }
}
