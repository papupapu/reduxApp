import { connect } from 'react-redux';

import { fetchPostsIfNeeded } from '../../common/redux/actions/Home';

import FullGallery from '../components/fullgallery/FullGallery';

const mapStateToProps = (state, { match }) => {
  const {
    postsByCategory,
  } = state;

  const category = match.params.category;
  const postId = match.params.id;

  let post = {};
  if (postsByCategory[category] !== undefined) {
    post = postsByCategory[category].items && postsByCategory[category].items.length > 0 ?
      postsByCategory[category].items.filter(el => el.id === postId)[0]
    :
      {};
  }
  const notFound = post === undefined;
  const shouldFetch = !notFound && Object.keys(post).length === 0;
  return { category, postId, post, shouldFetch, notFound };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: (category) => {
    dispatch(fetchPostsIfNeeded(category));
  },
});

const GalleryApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FullGallery);

export default GalleryApp;
