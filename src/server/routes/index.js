// @flow
import { Context } from 'koa';
import userRoutes from './user';
import adminRoutes from './admin';
import webserverRoutes from './webServer';

// Order is important as the webserverRoutes contain the default route
// this is due to a design fuckup by the router implementation.
const routes = Object.assign(
  {},
  // App routes
  userRoutes,
  // Admin routes
  adminRoutes,
  // webserver routes including /*
  webserverRoutes,
);

export default routes;
