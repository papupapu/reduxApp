import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';
import Modal from '../components/common/modal/Modal';
import Overlayer from '../components/common/overlayer/Overlayer';

const App = (
  {
    children,
    isHome,
    pageTitle,
    modal,
    modalType,
    modalData,
    toggleSiteHiddenComponents,
  },
) => (
  <div className="root full_header">
    <Header
      isHome={isHome}
      pageTitle={pageTitle}
      toggleSiteNavigation={toggleSiteHiddenComponents}
      openModal={toggleSiteHiddenComponents}
    />
    {children}
    <Footer />
    {
      modal &&
        <Modal
          type={modalType}
          data={modalData}
          close={toggleSiteHiddenComponents}
        />
    }
    {
      Overlayer(
        {
          action: toggleSiteHiddenComponents,
        },
      )
    }
  </div>
);

App.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  isHome: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
};

export default App;
