import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import Hamburger from '../icons/Hamburger';
import Avatar from '../icons/Avatar';

import { CATEGORIES } from '../../../../common/constants/Articles';

import './Header.css';

const HeaderPropTypes = {
  isHome: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  toggleSiteNavigation: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

const categoriesList = (onClickAction) => {
  const list = [];
  CATEGORIES.forEach(
    (el) => {
      list.push(
        <li key={`nav-${el.path}`}>
          <NavLink
            exact
            onClick={onClickAction}
            to={`/${el.path}`}
          >
            {el.label}
          </NavLink>
        </li>,
      );
    },
  );
  return list;
};

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
    const menu = categoriesList(this.props.toggleSiteNavigation);

    return (
      <header id="header">
        <div className="sw">
          {logo}
          <nav id="sitenav" className="noTransition">
            <ul itemScope itemType="http://www.schema.org/SiteNavigationElement">
              <li>
                <NavLink
                  exact
                  onClick={this.props.toggleSiteNavigation}
                  to={'/'}
                >
                  Home
                </NavLink>
              </li>
              {menu}
              <li>
                <NavLink
                  onClick={this.props.toggleSiteNavigation}
                  to={'/reddit'}
                >
                  Feed Reddit
                </NavLink>
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

Header.propTypes = HeaderPropTypes;
export default Header;
