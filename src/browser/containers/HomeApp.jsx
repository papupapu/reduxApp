import { connect } from 'react-redux';

import { fetchPostsIfNeeded } from '../../common/redux/actions/Home';

import Home from '../components/home/Home';

const mapStateToProps = (state) => {
  const {
    postsByCategory,
  } = state;

  const posts = postsByCategory.home && postsByCategory.home.items ?
    postsByCategory.home.items
  :
    [];
  return { posts };
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
