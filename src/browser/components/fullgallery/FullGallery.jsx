import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

import NotFound from '../notFound/NotFound';

import Gallery from '../common/gallery/Gallery';

import CorrectMediaSizes from '../../helpers/CorrectMediaSizes';

const FullGalleryPropTypes = {
  // ui specific
  device: PropTypes.string.isRequired,
  viewport: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,

  // view specific
  category: PropTypes.string.isRequired,
  post: PropTypes.instanceOf(Object).isRequired,
  shouldFetch: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

class FullGallery extends React.Component {

  componentWillMount() {
    const { category, shouldFetch, fetchPosts } = this.props;
    if (shouldFetch) {
      fetchPosts(category);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
      post,
      shouldFetch,
      notFound,
    } = this.props;

    let code;
    if (!notFound) {
      if (shouldFetch) {
        code = null;
      } else {
        code = (
          <Page
            isFullpage
            isDetail={false}
            pageTitle={`${post.heading.title} - ${post.category} - Papui`}
            modal={modal}
            modalData={modalData}
            modalType={modalType}
            toggleSiteHiddenComponents={toggleSiteHiddenComponents}
          >
            <div className="fullPage">
              <Gallery
                device={device}
                viewport={viewport}
                type="fullPage"
                category={post.category}
                title={post.heading.title}
                media={CorrectMediaSizes(device, post.category, post.heading.media)}
              />
            </div>
          </Page>
        );
      }
    } else {
      code = (<Route component={NotFound} />);
    }
    return code;
  }
}

FullGallery.propTypes = FullGalleryPropTypes;
export default UIHandler(FullGallery);
