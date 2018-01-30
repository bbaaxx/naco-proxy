// @flow
import clientHandlers from '../handler/clientHandler';
import jsonLintPath from '../middleware/jsonLintPath';

export default {
  'GET /__webpack_hmr': { handler: clientHandlers.hotMiddleware },
  'GET /*': { handler: clientHandlers.devMiddleware },
};
