import React from 'react';
import PropTypes from 'prop-types';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

import ChannelPicker from './components/ChannelPicker';
import Posts from './components/Posts';

const FeedPropTypes = {
  // ui specific
  device: PropTypes.string.isRequired,
  viewport: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
  // view specific
  feedChannelList: PropTypes.instanceOf(Object).isRequired,
  feedSelectedChannel: PropTypes.string.isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  isFetchingFeed: PropTypes.bool.isRequired,
  lastFetch: PropTypes.string,
  fetchPosts: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired,
  pickChannel: PropTypes.func.isRequired,
  refreshChannel: PropTypes.func.isRequired,
};

const FeedDefaultProps = {
  lastFetch: '',
};

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.channels = props.feedChannelList.channels;
  }

  componentWillMount() {
    const { fetchPosts, feedSelectedChannel } = this.props;
    fetchPosts(feedSelectedChannel);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.feedChannelList.channels.length !== this.props.feedChannelList.channels.length) {
      this.channels = nextProps.feedChannelList.channels;
    }
  }

  render() {
    const {
      // ui specific
      device,
      viewport,
      modal,
      modalData,
      modalType,
      toggleSiteHiddenComponents,
      // view specific
      feedSelectedChannel,
      isFetchingFeed,
      posts,
      lastFetch,
      addChannel,
      pickChannel,
      refreshChannel,
    } = this.props;

    return (
      <Page
        isFullpage={false}
        isDetail={false}
        pageTitle="Reddit Feeds - Papui"
        modal={modal}
        modalData={modalData}
        modalType={modalType}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div className="content">
          <ChannelPicker
            channels={this.channels}
            feedSelectedChannel={feedSelectedChannel}
            pickChannel={pickChannel}
            addChannel={addChannel}
            openModal={toggleSiteHiddenComponents}
          />
          <div className="sw">
            <Posts
              isFetchingFeed={isFetchingFeed}
              feedSelectedChannel={feedSelectedChannel}
              posts={posts}
              lastFetch={lastFetch}
              refreshChannel={refreshChannel}
            />
          </div>
        </div>
      </Page>
    );
  }
}

Feed.propTypes = FeedPropTypes;
Feed.defaultProps = FeedDefaultProps;
export default UIHandler(Feed);
