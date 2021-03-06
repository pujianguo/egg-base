'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      // 500错误会自动存放到错误日志中，手动抛出的错误尽量不要使用500，不会存入错误日志
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 用来配合console方法，直接返回data
      if (err.console) {
        if (!err.data) {
          ctx.body = {
            console: true,
            data: err.data,
          };
        } else {
          ctx.body = err.data;
        }
        return;
      }

      // validate插件验证不通过时抛出422，并且code='invalid_param'
      if (status === 422) {
        ctx.body = {
          code: -1,
          message: err.message,
          detail: err.errors,
        };
      } else {
        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = {
          code: err.code || -1,
          message: error,
        };
      }
      ctx.status = status;
    }
  };
};
