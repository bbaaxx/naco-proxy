// @flow
import bindSocket from './sockets';
import configureApp from './config/app';
import { getVar } from './config/getEnv';

const { PORT } = getVar('PORT');
const { NODE_ENV } = getVar('NODE_ENV');

const app = configureApp();

const server = app.listen(PORT, () => {
  let addr;
  let message;
  try {
    addr = server.address();
    bindSocket(server);
    message = `🚧 Koa server started at ${addr.address}:${addr.port} 🚧`;
  } catch (err) {
    message = err;
  } finally {
    console.log(message);
  }
});

export default app;
