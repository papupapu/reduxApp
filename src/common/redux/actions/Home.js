import fetch from 'isomorphic-fetch';

import { API_URLS } from '../../constants/Settings';

const api = document.location.hostname === 'localhost' ? API_URLS.local : API_URLS.prod;

/* actions types */

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

/* actions */

function fetchPostsRequest(category) {
  return {
    type: FETCH_POSTS_REQUEST,
    category,
  };
}

function fetchPostsSuccess(category, json) {
  return {
    type: FETCH_POSTS_SUCCESS,
    category,
    posts: json.articles,
  };
}

function fetchPosts(category) {
  return (dispatch) => {
    dispatch(fetchPostsRequest(category));
    return fetch(`${api}${category}.json`)
      .then(
        response => response.json(),
        error => console.log('error in fetch', error),
      )
      .then(
        json => dispatch(fetchPostsSuccess(category, json)),
      );
  };
}

function shouldFetchPosts(state, category) {
  const posts = state.postsByCategory[category];
  let flag;
  if (!posts) {
    flag = true;
  } else if (posts.isFetching) {
    flag = false;
  }
  return flag;
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category));
    }
    Promise.resolve();
  };
}
