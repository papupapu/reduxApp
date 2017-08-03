import { connect } from 'react-redux';

import { fetchPostsIfNeeded } from '../../common/redux/actions/Home';

import Category from '../components/category/Category';

const mapStateToProps = (state, { match }) => {
  const {
    postsByCategory,
  } = state;

  const category = match.path.replace('/', '');
  const posts = postsByCategory[category] && postsByCategory[category].items ?
    postsByCategory[category].items
  :
    [];

  return {
    category,
    posts,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: (category) => {
    dispatch(fetchPostsIfNeeded(category));
  },
});

const CategoryApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Category);

export default CategoryApp;
