import { connect } from 'react-redux';

import {
  addChannel,
  selectChannel,
  invalidateChannel,
  fetchPostsIfNeeded,
} from '../../common/redux/actions/Actions';

import Feed from '../components/feed/Feed';

const mapStateToProps = (state) => {
  const {
    channelList,
    selectedChannel,
    postsByChannel,
  } = state;

  const {
    isFetching,
    lastFetch,
    items: posts,
  } = postsByChannel[selectedChannel] || {
    isFetching: true,
    items: [],
  };

  return {
    channelList,
    selectedChannel,
    posts,
    isFetching,
    lastFetch,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: (channel) => {
    dispatch(fetchPostsIfNeeded(channel));
  },
  addChannel: (channel) => {
    dispatch(addChannel(channel));
  },
  pickChannel: (channel) => {
    dispatch(selectChannel(channel));
    dispatch(fetchPostsIfNeeded(channel));
  },
  refreshChannel: (channel) => {
    dispatch(invalidateChannel(channel));
    dispatch(fetchPostsIfNeeded(channel));
  },
});

const FeedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);

export default FeedApp;
