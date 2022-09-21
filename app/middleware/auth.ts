export default () => {
  return async function gzip(ctx, next) {
    // ctx.companyId = 0;
    ctx.test = 0;
    await next();
  };
};
