import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup.js';
import Dashboard from '../ui/Dashboard.js';
import NotFound from '../ui/NotFound.js';
import Login from '../ui/Login.js';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnAuthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
      <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
      <Route path="*" component={NotFound}/>
    </Router>
);
