import { combineReducers } from 'redux';
import * as reducers from './Reducers';

const fetchApp = combineReducers(reducers);
export default fetchApp;
