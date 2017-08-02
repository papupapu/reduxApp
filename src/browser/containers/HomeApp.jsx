import { connect } from 'react-redux';

import Home from '../components/home/Home';

const mapStateToProps = state => state;

const HomeApp = connect(
  mapStateToProps,
)(Home);

export default HomeApp;
