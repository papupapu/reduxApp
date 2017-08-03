import React from 'react';
import PropTypes from 'prop-types';

import { Link, NavLink } from 'react-router-dom';

import Hamburger from '../icons/Hamburger';
import Avatar from '../icons/Avatar';

import { CATEGORIES } from '../../../../common/constants/Articles';

import './Header.css';

const HeaderPropTypes = {
  isDetail: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  toggleSiteNavigation: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

const categoriesList = (onClickAction) => {
  const list = [];
  CATEGORIES.forEach(
    (el) => {
      const exactLink = el.label === 'Home';
      list.push(
        <li key={`nav-${el.path}`}>
          <NavLink
            exact={exactLink}
            onClick={onClickAction}
            to={`/${el.path}`}
            title={el.label}
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
    const logo = this.props.isDetail ? (
      <h1 className="logo">
        <Link to="/" title={this.props.pageTitle}>{this.props.pageTitle}</Link>
      </h1>
    ) : (
      <div className="logo">
        <Link to="/" title={this.props.pageTitle}>{this.props.pageTitle}</Link>
      </div>
    );
    const menu = categoriesList(this.props.toggleSiteNavigation);

    return (
      <header id="header">
        <div className="sw">
          {logo}
          <nav id="sitenav" className="noTransition">
            <ul itemScope itemType="http://www.schema.org/SiteNavigationElement">
              {menu}
              <li>
                <NavLink
                  onClick={this.props.toggleSiteNavigation}
                  to={'/reddit'}
                  title="Reddit Feed"
                >
                  Reddit Feed
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
                  title="Sign in"
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
