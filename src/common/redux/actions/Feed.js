import fetch from 'isomorphic-fetch';

/* actions types */

export const ADD_FEED_CHANNEL = 'ADD_FEED_CHANNEL';
export const SELECT_FEED_CHANNEL = 'SELECT_FEED_CHANNEL';
export const INVALIDATE_FEED_CHANNEL = 'INVALIDATE_FEED_CHANNEL';
export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';

/* actions */

export function addFeedChannel(channel) {
  return {
    type: ADD_FEED_CHANNEL,
    channel,
  };
}

export function selectFeedChannel(channel) {
  return {
    type: SELECT_FEED_CHANNEL,
    channel,
  };
}

export function invalidateFeedChannel(channel) {
  return {
    type: INVALIDATE_FEED_CHANNEL,
    channel,
  };
}

function fetchFeedPostsRequest(channel) {
  return {
    type: FETCH_FEED_REQUEST,
    channel,
  };
}

function fetchFeedPostsSuccess(channel, json) {
  const now = new Date().toLocaleTimeString();
  return {
    type: FETCH_FEED_SUCCESS,
    channel,
    posts: json.data.children.map(child => child.data),
    lastFetch: now,
  };
}

function fetchFeedPosts(channel) {
  return (dispatch) => {
    dispatch(fetchFeedPostsRequest(channel));
    return fetch(`https://www.reddit.com/r/${channel}.json`)
      .then(
        response => response.json(),
        error => console.log('error in fetch', error),
      )
      .then(
        json => dispatch(fetchFeedPostsSuccess(channel, json)),
      );
  };
}

function shouldfetchFeedPosts(state, channel) {
  const posts = state.feedPostsByChannel[channel];
  let flag;
  if (!posts) {
    flag = true;
  } else if (posts.isFetchingFeed) {
    flag = false;
  } else {
    flag = posts.didInvalidate;
  }
  return flag;
}

export function fetchFeedPostsIfNeeded(channel) {
  return (dispatch, getState) => {
    if (shouldfetchFeedPosts(getState(), channel)) {
      return dispatch(fetchFeedPosts(channel));
    }
    Promise.resolve();
  };
}
