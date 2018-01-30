// @flow
import { Context } from 'koa';

import userRoutes from './user';
import collectionRoutes from './collection';
import adminRoutes from './admin';
import webserverRoutes from './webServer';

// Order is important as the webserverRoutes contain the default route
// this is due to a design fuckup by the router implementation.
const routes = Object.assign(
  {},

  // App routes
  userRoutes,
  collectionRoutes,

  // Admin routes
  adminRoutes,

  // webserver routes (includes /*)
  webserverRoutes,
);

export default routes;
