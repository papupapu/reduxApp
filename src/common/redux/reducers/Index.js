import { combineReducers } from 'redux';
import postsByCategory from './Home';
import { feedChannelList, feedSelectedChannel, feedPostsByChannel } from './Feed';

const appReducer = combineReducers({
  postsByCategory,
  feedChannelList,
  feedSelectedChannel,
  feedPostsByChannel,
});
export default appReducer;
