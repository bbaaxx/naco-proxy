export default propName => async (ctx: Context, next: () => void) => {
  await next();
  ctx.body = ctx.request.body[propName];
};
