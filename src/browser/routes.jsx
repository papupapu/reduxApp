import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import HomeApp from './containers/HomeApp';
import FeedApp from './containers/FeedApp';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeApp} />
      <Route path="/reddit" component={FeedApp} />
    </Switch>
  </Router>
);

export default AppRouter;
