import dotenv from 'dotenv';
import configureApp from './config/app';
import bindSocket from './sockets';

if (dotenv && typeof dotenv.config === 'function') dotenv.config();
const { FAVICON, PORT, NODE_ENV, APP_ID } = process.env;

const app = configureApp({
  favicon: FAVICON,
  env: NODE_ENV,
  appId: APP_ID,
});

const server = app.listen(PORT || 3000, () => {
  let addr;
  try {
    addr = server.address();
    bindSocket(server);
  }
  catch(err) { console.error(err); }
  finally { console.log(`Koa server started at ${addr.address}:${addr.port}`); }
});

export default app;
