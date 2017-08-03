import React from 'react';
import PropTypes from 'prop-types';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

const HomePropTypes = {
  // ui specific
  device: PropTypes.string.isRequired,
  viewport: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
  // view specific
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
};

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchPosts('home');
  }

  render() {
    const {
      modal,
      modalData,
      modalType,
      toggleSiteHiddenComponents,
      posts,
    } = this.props;

    return (
      <Page
        isFullpage={false}
        isHome
        pageTitle="Project"
        modal={modal}
        modalData={modalData}
        modalType={modalType}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div className="content">
          <div className="sw">
            ciao, sono la home!<br />
            {
              posts.length > 0 &&
                <span>ci sono {posts.length} post da leggere!</span>
            }
          </div>
        </div>
      </Page>
    );
  }
}

Home.propTypes = HomePropTypes;
export default UIHandler(Home);
