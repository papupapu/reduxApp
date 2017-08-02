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
  channelList: PropTypes.instanceOf(Object).isRequired,
  selectedChannel: PropTypes.string.isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  isFetching: PropTypes.bool.isRequired,
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
    this.channels = props.channelList.channels;
  }

  componentDidMount() {
    const { fetchPosts, selectedChannel } = this.props;
    fetchPosts(selectedChannel);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channelList.channels.length !== this.props.channelList.channels.length) {
      this.channels = nextProps.channelList.channels;
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
      selectedChannel,
      isFetching,
      posts,
      lastFetch,
      addChannel,
      pickChannel,
      refreshChannel,
    } = this.props;

    return (
      <Page
        isFullpage={false}
        isHome={false}
        pageTitle="Reddit Feeds - Project"
        modal={modal}
        modalData={modalData}
        modalType={modalType}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div className="content">
          <ChannelPicker
            channels={this.channels}
            selectedChannel={selectedChannel}
            pickChannel={pickChannel}
            addChannel={addChannel}
            openModal={toggleSiteHiddenComponents}
          />
          <div className="sw">
            <Posts
              isFetching={isFetching}
              selectedChannel={selectedChannel}
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
