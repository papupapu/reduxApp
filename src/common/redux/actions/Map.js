import fetch from 'isomorphic-fetch';

/* actions types */

export const FETCH_MAP_REQUEST = 'FETCH_MAP_REQUEST';
export const FETCH_MAP_SUCCESS = 'FETCH_MAP_SUCCESS';

/* actions */

function fetchMapRequest() {
  return {
    type: FETCH_MAP_REQUEST,
  };
}

function fetchMapSuccess(json) {
  return {
    type: FETCH_MAP_SUCCESS,
    posts: json.data.tieredResults[0].results,
  };
}

function fetchMap() {
  return (dispatch) => {
    dispatch(fetchMapRequest());
    return fetch('http://localhost:8888/mappa_dati.json')
      .then(
        response => response.json(),
        error => console.log('error in fetch', error),
      )
      .then(
        json => dispatch(fetchMapSuccess(json)),
      );
  };
}

function shouldfetchMap(state) {
  const posts = state.mapFeed;
  let flag;
  if (!posts || Object.keys(posts).length === 0) {
    flag = true;
  } else if (posts.isFetchingFeed) {
    flag = false;
  }
  return flag;
}

export function fetchMapIfNeeded() {
  return (dispatch, getState) => {
    if (shouldfetchMap(getState())) {
      return dispatch(fetchMap());
    }
    Promise.resolve();
  };
}
