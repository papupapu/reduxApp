import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import HomeApp from './containers/HomeApp';
import CategoryApp from './containers/CategoryApp';
import DetailApp from './containers/DetailApp';
import FeedApp from './containers/FeedApp';

import { CATEGORIES } from '../common/constants/Articles';

const categoriesRouteList = () => {
  const list = [];
  CATEGORIES.forEach(
    (el) => {
      list.push(
        <Route
          key={`route-${el.path}`}
          exact
          path={`/${el.path}`}
          component={CategoryApp}
        />,
      );
    },
  );
  return list;
};
const categoryRoutes = categoriesRouteList();

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeApp} />
      {categoryRoutes}
      <Route path="/:category/:id" component={DetailApp} />
      <Route path="/reddit" component={FeedApp} />
    </Switch>
  </Router>
);

export default AppRouter;
