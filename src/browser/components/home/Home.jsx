import React from 'react';
import PropTypes from 'prop-types';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

const HomePropTypes = {
  // device: PropTypes.string.isRequired,
  // viewport: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
};

const Home = ({
  // ui specific
  // device,
  // viewport,
  modal,
  modalData,
  modalType,
  toggleSiteHiddenComponents,
}) => (
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
      ciao, sono la home. clicca per vedere i feed reddit
    </div>
  </Page>
);

Home.propTypes = HomePropTypes;
export default UIHandler(Home);
