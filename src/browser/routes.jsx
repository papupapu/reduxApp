import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import HomeApp from './containers/HomeApp';
import CategoryApp from './containers/CategoryApp';
import DetailApp from './containers/DetailApp';
import GalleryApp from './containers/GalleryApp';
import FeedApp from './containers/FeedApp';
import MapApp from './containers/MapApp';
import NotFound from './components/notFound/NotFound';

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
      <Route path="/gallery/:category/:id" component={GalleryApp} />
      {categoryRoutes}
      <Route path="/:category/:id" component={DetailApp} />
      <Route path="/reddit" component={FeedApp} />
      <Route path="/map" component={MapApp} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default AppRouter;
