import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/account-config';
import { renderRoutes } from '../client/routes';

Meteor.startup(() => {
  // render(<App />, document.getElementById('render-target'));
  render(renderRoutes(), document.getElementById('render-target'));
});
