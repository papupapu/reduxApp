import { connect } from 'react-redux';

import { fetchPostsIfNeeded } from '../../common/redux/actions/Home';

import Detail from '../components/detail/Detail';

const mapStateToProps = (state, { match }) => {
  const {
    postsByCategory,
  } = state;

  const category = match.params.category;
  const postId = match.params.id;
  let post = {};
  let categoryPosts = [];
  if (
    postsByCategory[category] !== undefined &&
    postsByCategory[category].items &&
    postsByCategory[category].items.length > 0
  ) {
    post = postsByCategory[category].items.filter(el => el.id === postId)[0];
    categoryPosts = postsByCategory[category].items.filter(el => el.id !== postId);
  }
  const notFound = post === undefined;
  const shouldFetch = !notFound && Object.keys(post).length === 0;

  return {
    shouldFetch,
    category,
    postId,
    post,
    categoryPosts,
    notFound,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: (category) => {
    dispatch(fetchPostsIfNeeded(category));
  },
});

const DetailApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);

export default DetailApp;
