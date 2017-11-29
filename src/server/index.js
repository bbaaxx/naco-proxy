import dotenv from 'dotenv';
import configureApp from './config/app';
import bindSocket from './sockets';

if (dotenv && typeof dotenv.config === 'function') dotenv.config();

const PORT = process.env.PORT || 3000;
const app = configureApp();

const server = app.listen(process.env.PORT, () => {
  let addr;
  try {
    addr = server.address();
    bindSocket(server);
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`Koa server started at ${addr.address}:${addr.port}`);
  }
});

export default app;
