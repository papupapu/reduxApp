import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

import './NotFound.css';

const NotFoundPropTypes = {
  // ui specific
  device: PropTypes.string.isRequired,
  viewport: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
};

class NotFound extends React.Component {

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
    } = this.props;
    return (
      <Page
        isFullpage={false}
        isDetail={false}
        pageTitle={'404 - Papui'}
        modal={modal}
        modalData={modalData}
        modalType={modalType}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div className="notFound">
          <div>
            <p className="first">you might say we made a mistake...</p>
            <p className="second">but well... that&#39;s just like your opinion man...</p>
            <p className="third">
              go back to the <Link to="/">home page</Link>
            </p>
          </div>
        </div>
      </Page>
    );
  }
}

NotFound.propTypes = NotFoundPropTypes;
export default UIHandler(NotFound);
