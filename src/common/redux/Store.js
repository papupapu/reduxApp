import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import appReducer from './reducers/Index';

const loggerMiddleWare = createLogger();

const store = createStore(
  appReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleWare,
  ),
);

export default store;
