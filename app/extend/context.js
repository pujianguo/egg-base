'use strict';

// 这里的方法会绑定到ctx上
module.exports = {
  result(data = 'ok') {
    this.body = data;
  },
  error(httpStatus = 400, msg = '', code = -1) {
    // 这里不要设置body，抛出异常让系统自动捕获，这样在任何时候抛出都会直接中断并返回结果
    this.throw(httpStatus, msg, { code });
  },
};
