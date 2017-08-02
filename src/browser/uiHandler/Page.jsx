import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';
import Modal from '../components/common/modal/Modal';
import Overlayer from '../components/common/overlayer/Overlayer';

const App = (
  {
    children,
    isFullpage,
    isHome,
    pageTitle,
    modal,
    modalType,
    modalData,
    toggleSiteHiddenComponents,
  },
) => {
  let code;
  if (isFullpage) {
    code = (
      <div className="root">
        {children}
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
  } else {
    code = (
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
  }
  return code;
};

App.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  isFullpage: PropTypes.bool.isRequired,
  isHome: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
};

export default App;
