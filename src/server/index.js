import bindSocket from './sockets';
import configureApp from './config/app';
import { getVar } from './config/getEnv';

const { PORT, NODE_ENV } = getVar('PORT');

const app = configureApp();

const server = app.listen(PORT || 3000, () => {
  let addr;
  try {
    addr = server.address();
    bindSocket(server);
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`🚧 Koa server started at ${addr.address}:${addr.port} 🚧`);
  }
});

export default app;
