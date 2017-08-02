import React from 'react';
import PropTypes from 'prop-types';

import UIHandler from '../../app/UIHandler';
import App from '../../app/App';

class Home extends React.Component {
  constructor(props) {
    super(props);
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
    } = this.props;

    return (
      <App
        isHome
        pageTitle="Project"
        modal={modal}
        modalData={modalData}
        modalType={modalType}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div className="content">
          ciao, sono la home. clicca per vedere i feed reddit
        </div>
      </App>
    );
  }
}

Home.propTypes = {
  device: PropTypes.string.isRequired,
  viewport: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
};

export default UIHandler(Home);
