import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import HomePage from '../imports/ui/HomePage';
import ProfilePage from '../imports/ui/ProfilePage';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      {/* <Route exact path="/lists/:id" component={ListPageContainer}/> */}
      <Route exact path="/profile" component={ProfilePage}/>
    </Switch>
  </Router>
);