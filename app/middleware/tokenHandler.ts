'use strict';
module.exports = options => {
  return async function(ctx, next) {
    const BearerToken: string = ctx.request.header.authorization || '';
    const token: string = BearerToken.replace(/^Bearer /, '');
    console.log('token', token);
    console.log('state', ctx.state);
    let decode;
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);// 验证token
        console.log('decode======>', decode);
        // 获取用户信息
        ctx.decode = decode;
        ctx.userPhone = decode.phone;

        const companyId = ctx.request.header['company-id'];
        ctx.userPhone = decode.phone;
        ctx.companyId = companyId;
      } catch (error: any) {
        ctx.status = 200;
        ctx.body = {
          code: 50014,
          data: {},
          success: true,
          msg: '登录过期',
        };
        return;
      }
      // 切记先解析token并存储数据后再执行回调，否则解析数据获取不到x
      await next();
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 50008,
        data: {},
        success: true,
        msg: '没有token',
      };
      return;
    }
  };
};
