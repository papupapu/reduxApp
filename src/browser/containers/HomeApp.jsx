import { connect } from 'react-redux';

import { fetchPostsIfNeeded } from '../../common/redux/actions/Home';

import Home from '../components/home/Home';

const mapStateToProps = (state) => {
  const {
    postsByCategory,
  } = state;

  const category = 'home';
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

const HomeApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeApp;
