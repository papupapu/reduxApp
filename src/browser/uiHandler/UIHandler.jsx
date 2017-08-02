import React from 'react';

import { userDevice } from '../helpers/DOMHelpers';

import './Page.css';

export default function UIHandler(Content) {
  class uiHandler extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        device: '',
        viewport: { width: '', height: '' },
        touchscreen: false,
        modal: false,
        bookmarkConfirm: false,
      };

      this.modalType = '';
      this.modalData = {};
      this.uiHiddenComponents = ['menu', 'modal', 'phoneCallConfirm', 'addBookmarkConfirm', 'filters'];

      this.setUiInfos = this.setUiInfos.bind(this);
      this.computeUiInfos = this.computeUiInfos.bind(this);
      this.toggleSiteHiddenComponents = this.toggleSiteHiddenComponents.bind(this);
    }

    componentDidMount() {
      const ui = userDevice();
      this.setUiInfos(ui);
      window.addEventListener('resize', this.computeUiInfos, false);
      this.doc = document.body;
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.computeUiInfos, false);
    }

    setUiInfos(ui) {
      this.setState({
        device: ui.device,
        viewport: ui.viewport,
        touchscreen: ui.touchscreen,
      });
    }

    computeUiInfos() {
      const updatedUi = userDevice();
      this.setUiInfos(updatedUi);
    }

    toggleSiteHiddenComponents(evt, obj) {
      if (this.doc !== null) {
        const docClass = this.doc.classList;
        let action;
        if (evt.target.classList && evt.target.classList.length > 1) {
          evt.target.classList.forEach(
            (el) => {
              if (el.indexOf('_handle') > -1) {
                action = el;
              }
            },
          );
        } else {
          action = evt.target.className;
        }
        let updateModalState = false;
        if (action.indexOf('_handle') > -1) {
          action = action.replace('_handle', '_open');
          updateModalState = action === 'modal_open';
          if (docClass.contains(action)) {
            docClass.remove(action);
            docClass.add('closing');
            setTimeout(() => { docClass.remove('closing'); }, 305);
            // enableScroll();
          } else {
            this.uiHiddenComponents.forEach(
              (component) => {
                const oldaction = `${component}_open`;
                if (docClass.contains(oldaction) && oldaction !== action) {
                  docClass.remove(oldaction);
                  updateModalState = oldaction === 'modal_open';
                }
              },
            );
            docClass.add(action);
            // disableScroll();
          }
          if (updateModalState) {
            this.modalType = !this.state.modal ? evt.target.getAttribute('data-action') : '';
            this.modalData = !this.state.modal && obj !== null ? obj : {};
            this.setState({ modal: !this.state.modal });
          } else if (action === 'addBookmarkConfirm_open') {
            this.setState({ bookmarkConfirm: !this.state.bookmarkConfirm });
          }
        } else { // overlayer
          this.uiHiddenComponents.forEach(
            (component) => {
              const oldaction = `${component}_open`;
              if (docClass.contains(oldaction)) {
                docClass.remove(oldaction);
                docClass.add('closing');
                setTimeout(() => { docClass.remove('closing'); }, 305);
                // enableScroll();
              }
            },
          );
          if (this.state.modal) {
            this.modalType = '';
            this.modalData = {};
            this.setState({ modal: false });
          }
          if (this.state.bookmarkConfirm) {
            this.setState({ bookmarkConfirm: false });
          }
        }
      }
    }

    render() {
      return (
        <Content
          {...this.props}
          {...this.state}
          modalType={this.modalType}
          modalData={this.modalData}
          toggleSiteHiddenComponents={this.toggleSiteHiddenComponents}
        />
      );
    }
  }

  return uiHandler;
}
