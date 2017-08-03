import { FEED_CHANNELS } from '../../constants/Settings';

import {
  ADD_FEED_CHANNEL,
  SELECT_FEED_CHANNEL,
  INVALIDATE_FEED_CHANNEL,
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
} from '../actions/Feed';

const initialChannelsState = {
  channels: FEED_CHANNELS,
};

export function feedChannelList(state = initialChannelsState, action) {
  switch (action.type) {
    case ADD_FEED_CHANNEL:
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

export function feedSelectedChannel(state = initialChannelsState.channels[0], action) {
  switch (action.type) {
    case SELECT_FEED_CHANNEL:
      return action.channel;
    default:
      return state;
  }
}

function feedPosts(
  state = {
    isFetchingFeed: false,
    didInvalidate: false,
    items: [],
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_FEED_CHANNEL:
      return Object.assign(
        {},
        state,
        {
          didInvalidate: true,
        },
      );
    case FETCH_FEED_REQUEST:
      return Object.assign(
        {},
        state,
        {
          isFetchingFeed: true,
          didInvalidate: false,
        },
      );
    case FETCH_FEED_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isFetchingFeed: false,
          didInvalidate: false,
          items: action.posts,
          lastFetch: action.lastFetch,
        },
      );
    default:
      return state;
  }
}

export function feedPostsByChannel(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_FEED_CHANNEL:
    case FETCH_FEED_REQUEST:
    case FETCH_FEED_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          [action.channel]: feedPosts(state[action.channel], action),
        },
      );
    default:
      return state;
  }
}
