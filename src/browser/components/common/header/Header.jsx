import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Hamburger from '../icons/Hamburger';
import Avatar from '../icons/Avatar';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const logo = this.props.isHome ? (
      <h1 className="logo">
        <a href="/" title={this.props.pageTitle}>{this.props.pageTitle}</a>
      </h1>
    ) : (
      <div className="logo">
        <a href="/" title={this.props.pageTitle}>{this.props.pageTitle}</a>
      </div>
    );
    return (
      <header id="header">
        <div className="sw">
          {logo}
          <nav id="sitenav" className="noTransition">
            <ul itemScope itemType="http://www.schema.org/SiteNavigationElement">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/reddit">Feed Reddit</Link>
              </li>
            </ul>
          </nav>
          <menu id="sitemenu">
            <ul>
              <li>
                <a
                  className="menu_handle"
                  href=""
                  title="Menu"
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.props.toggleSiteNavigation(evt);
                  }}
                >
                  {Hamburger()}
                </a>
              </li>
              <li className="mycasa">
                <a
                  className="modal_handle"
                  href=""
                  title="Accedi a MyCasa"
                  data-action="login"
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.props.openModal(evt, { title: 'titolo', subtitle: 'sottotitolo' });
                  }}
                >
                  {Avatar({ isAuthenticated: false })}
                </a>
              </li>
            </ul>
          </menu>          
        </div>
      </header>
    );
  }
}

/*
          <a
            className="modal_handle"
            href=""
            data-action="login"
            onClick={(e) => { e.preventDefault(); openModal(e, { title: 'titolo', subtitle: 'sottotitolo' }); }}
          >
            modale
          </a>
*/

Header.propTypes = {
  isHome: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  toggleSiteNavigation: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Header;
