import React from 'react';
import PropTypes from 'prop-types';

import UIHandler from '../../uiHandler/UIHandler';
import Page from '../../uiHandler/Page';

import Article from '../common/article/Article';
import Listing from '../common/listing/Listing';

import { ARTICLELIST_MAX_ITEMS } from '../../../common/constants/Articles';

const elementsFromProps = (data) => {
  let main = {};
  const list = [];
  if (data.length > 0) {
    main = data[0];
    for (let i = 1; i < Object.keys(data).length; i += 1) {
      list.push(data[i]);
    }
  }
  return { main, list };
};

const HomePropTypes = {
  // ui specific
  device: PropTypes.string.isRequired,
  viewport: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.bool.isRequired,
  modalData: PropTypes.instanceOf(Object).isRequired,
  modalType: PropTypes.string.isRequired,
  toggleSiteHiddenComponents: PropTypes.func.isRequired,
  // view specific
  category: PropTypes.string.isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    const articles = elementsFromProps(props.posts);
    this.main = articles.main;
    this.list = articles.list;
  }

  componentWillMount() {
    const { category, fetchPosts } = this.props;
    fetchPosts(category);
  }

  componentWillReceiveProps(newProps) {
    const articles = elementsFromProps(newProps.posts);
    this.main = articles.main;
    this.list = articles.list;
  }

  mainArticle() {
    const { device, viewport, toggleSiteHiddenComponents } = this.props;
    const article = this.main;
    return (
      <Article
        device={device}
        viewport={viewport}
        id={article.id}
        category={article.category}
        heading={article.heading}
        body={article.body}
        titleTag={'h2'}
        type={'listCover'}
        openModal={toggleSiteHiddenComponents}
      />
    );
  }

  articlesList(titleTag, maxToShow = ARTICLELIST_MAX_ITEMS) {
    const { device, viewport, toggleSiteHiddenComponents } = this.props;
    return (
      <Listing
        device={device}
        viewport={viewport}
        list={this.list}
        contentType={'articles'}
        titleTag={titleTag}
        maxToShow={maxToShow}
        openModal={toggleSiteHiddenComponents}
      />
    );
  }

  render() {
    const {
      modal,
      modalData,
      modalType,
      posts,
      toggleSiteHiddenComponents,
    } = this.props;

    const mainArticle = posts.length > 0 ? this.mainArticle() : null;
    const listing = posts.length > 1 ? this.articlesList('h3') : null;
    return (
      <Page
        isFullpage={false}
        isDetail={false}
        pageTitle="Papui"
        modal={modal}
        modalData={modalData}
        modalType={modalType}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div className="content">
          {mainArticle}
          <div className="sw">
            {listing}
          </div>
        </div>
      </Page>
    );
  }
}

Home.propTypes = HomePropTypes;
export default UIHandler(Home);
