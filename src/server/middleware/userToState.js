import User from '../datamodel/User';

export default (statePath: string = 'user') => async (ctx, next) => {
  // TODO :: Complete this with a check for user on the header
  ctx.state[statePath] = await User.findOne({ email: 'test@example.com' });
  await next();
};
