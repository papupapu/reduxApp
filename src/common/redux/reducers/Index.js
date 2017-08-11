import { combineReducers } from 'redux';
import postsByCategory from './Home';
import { feedChannelList, feedSelectedChannel, feedPostsByChannel } from './Feed';
import mapFeed from './Map';

const appReducer = combineReducers({
  postsByCategory,
  feedChannelList,
  feedSelectedChannel,
  feedPostsByChannel,
  mapFeed,
});
export default appReducer;
