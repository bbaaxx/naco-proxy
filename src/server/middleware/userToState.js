// @flow
import { Context } from 'koa';
import User from '../datamodel/User';
import {
  checkUserPassword,
  issueUserToken,
  verifyUserToken,
} from '../helper/auth';
import { findDocument } from '../helper/crud';

export const userToState = (statePath: string = 'user') => async (
  ctx: Context,
  next: () => Promise<any>,
) => {
  // TODO :: Complete this with a check for a header token
  const token = ctx.request.headers['authorization'].split(' ')[1];
  const decodedToken = await verifyUserToken(token);
  ctx.state[statePath] = await findDocument(User, {
    _id: decodedToken._id,
  });
  console.log(ctx.state[statePath]);
  await next();
  console.log(ctx.state[statePath]);
};

export const pickCredentialsFromBody = (statePath: string = 'user') => async (
  ctx: Context,
  next: () => Promise<any>,
) => {
  const { email, password } = ctx.request.body;
  ctx.state[statePath] = { email, password };
  await next();
};

export const logUserIn = (statePath: string = 'user') => async (
  ctx: Context,
  next: () => Promise<any>,
) => {
  const { email, password } = ctx.state[statePath];
  ctx.state[statePath] = null;
  const user = await findDocument(User, { email }, { populate: true });
  const { hash } = user.secret;
  if (await checkUserPassword(password, user.secret.hash)) {
    ctx.state[statePath] = user;
  }
  await next();
};

export const stripSecretMiddleware = () => async (
  ctx: Context,
  next: () => Promise<any>,
) => {
  if (ctx.state) arrayOrObj(ctx.state, stripSecrets);
  await next();
  if (ctx.body) arrayOrObj(ctx.body, stripSecrets);
};

export const issueUserTokenMiddleware = (statePath: string = 'user') => async (
  ctx: Context,
  next: () => Promise<any>,
) => {
  const token = issueUserToken({ _id: ctx.state[statePath]._id });
  await next();
  ctx.body = { auth: true, token };
};

////////////// HID //////////////
function stripSecrets(obj: any) {
  if (obj.user && obj.user.secret) obj.user.secret = void 0;
  if (obj.user && obj.user.password) obj.user.password = void 0;
  if (obj.secret) obj.secret = void 0;
  if (obj.password) obj.password = void 0;
}

function arrayOrObj(obj, f) {
  if (typeof f === 'function') {
    if (Array.isArray(obj)) {
      obj.forEach(f);
    } else {
      f(obj);
    }
  }
  return obj;
}
