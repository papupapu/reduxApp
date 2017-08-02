import fetch from 'isomorphic-fetch';

/* actions types */

export const ADD_CHANNEL = 'ADD_CHANNEL';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const INVALIDATE_CHANNEL = 'INVALIDATE_CHANNEL';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

/* actions */

export function addChannel(channel) {
  return {
    type: ADD_CHANNEL,
    channel,
  };
}

export function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    channel,
  };
}

export function invalidateChannel(channel) {
  return {
    type: INVALIDATE_CHANNEL,
    channel,
  };
}

function fetchPostsRequest(channel) {
  return {
    type: FETCH_POSTS_REQUEST,
    channel,
  };
}

function fetchPostsSuccess(channel, json) {
  const now = new Date().toLocaleTimeString();
  return {
    type: FETCH_POSTS_SUCCESS,
    channel,
    posts: json.data.children.map(child => child.data),
    lastFetch: now,
  };
}

function fetchPosts(channel) {
  return (dispatch) => {
    dispatch(fetchPostsRequest(channel));
    return fetch(`https://www.reddit.com/r/${channel}.json`)
      .then(
        response => response.json(),
        error => console.log('error in fetch', error),
      )
      .then(
        json => dispatch(fetchPostsSuccess(channel, json)),
      );
  };
}

function shouldFetchPosts(state, channel) {
  const posts = state.postsByChannel[channel];
  let flag;
  if (!posts) {
    flag = true;
  } else if (posts.isFetching) {
    flag = false;
  } else {
    flag = posts.didInvalidate;
  }
  return flag;
}

export function fetchPostsIfNeeded(channel) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), channel)) {
      return dispatch(fetchPosts(channel));
    }
    Promise.resolve();
  };
}
