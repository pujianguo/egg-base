'use strict';

const jwt = require('jsonwebtoken');
module.exports = () => {
  return async function auth(ctx, next) {
    try {
      const decode = jwt.verify(ctx.request.header.token, ctx.app.config.jwt.secret);
      ctx.userId = decode.id;
      await next();
    } catch (err) {
      ctx.error(401, '授权失败，请重新登录');
    }
  };
};