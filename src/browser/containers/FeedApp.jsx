import { connect } from 'react-redux';

import {
  addFeedChannel,
  selectFeedChannel,
  invalidateFeedChannel,
  fetchFeedPostsIfNeeded,
} from '../../common/redux/actions/Feed';

import Feed from '../components/feed/Feed';

const mapStateToProps = (state) => {
  const {
    feedChannelList,
    feedSelectedChannel,
    feedPostsByChannel,
  } = state;

  const {
    isFetchingFeed,
    lastFetch,
    items: posts,
  } = feedPostsByChannel[feedSelectedChannel] || {
    isFetchingFeed: true,
    items: [],
  };

  return {
    feedChannelList,
    feedSelectedChannel,
    posts,
    isFetchingFeed,
    lastFetch,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: (channel) => {
    dispatch(fetchFeedPostsIfNeeded(channel));
  },
  addChannel: (channel) => {
    dispatch(addFeedChannel(channel));
  },
  pickChannel: (channel) => {
    dispatch(selectFeedChannel(channel));
    dispatch(fetchFeedPostsIfNeeded(channel));
  },
  refreshChannel: (channel) => {
    dispatch(invalidateFeedChannel(channel));
    dispatch(fetchFeedPostsIfNeeded(channel));
  },
});

const FeedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);

export default FeedApp;
