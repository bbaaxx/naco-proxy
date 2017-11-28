import dotenv from 'dotenv';
import configureApp from './config/app';
import { getEnv, debug } from './config/util';

dotenv.config();

const PORT = getEnv('PORT') || 3000;
const app = configureApp();

app.listen(PORT, () =>
  debug(`Your awesome Koa API is running @ http://127.0.0.1:${PORT}`),
);
