import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

import NotFound from '../notFound/NotFound';

import Article from '../common/article/Article';

const DetailPropTypes = {
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

class Detail extends React.Component {

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
            isFullpage={false}
            isDetail
            pageTitle={`${post.heading.title} - Papui`}
            modal={modal}
            modalData={modalData}
            modalType={modalType}
            toggleSiteHiddenComponents={toggleSiteHiddenComponents}
          >
            <div className="content">
              <Article
                {...post}
                titleTag={'h1'}
                type="detail"
                device={device}
                viewport={viewport}
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

Detail.propTypes = DetailPropTypes;
export default UIHandler(Detail);
