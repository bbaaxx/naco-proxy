import { parse as jsonLint } from 'jsonlint';

export default propName =>
  async function jsonLintAt(ctx: Context, next: () => void) {
    const responseJson = ctx.request.body[propName];
    // Anti-pattern from the book
    try {
      ctx.request.body[propName] = jsonLint(responseJson);
    } catch (e) {
      ctx.throw(400, 'Invalid response JSON', e);
    }
    await next();
  };
