// @flow
import { Context } from 'koa';
import User from '../datamodel/User';
import { issueUserToken } from '../helper/auth';

export default (statePath: string = 'user') => async (
  ctx: Context,
  next: () => Promise<any>,
) => {
  // TODO :: Complete this with a check for a header token
  ctx.state[statePath] = await User.findOne({ email: 'test@example.com' });
  await next();
};

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

export async function stripSecretMiddleware(
  ctx: Context,
  next: () => Promise<any>,
) {
  if (ctx.state) arrayOrObj(ctx.state, stripSecrets);
  await next();
  if (ctx.body) arrayOrObj(ctx.body, stripSecrets);
}

export async function issueUserTokenMiddleware(
  ctx: Context,
  next: () => Promise<any>,
) {
  const token = issueUserToken({ _id: ctx.state.user._id });
  await next();
  ctx.body = { auth: true, token };
}
