import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import fetchApp from './reducers/Index';

const loggerMiddleWare = createLogger();

const store = createStore(
  fetchApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleWare,
  ),
);

export default store;
