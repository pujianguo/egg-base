'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class LoginService extends Service {
  async login(username, password) {
    const { ctx } = this;
    // const userData = await ctx.model.Users.findOneByElement({
    //   username,
    // });
    const userData = {
      id: 1,
      username,
      password: '123456',
    };

    if (!userData) {
      ctx.error('用户不存在', 404);
    }
    if (userData.password !== password) {
      ctx.error(400, '密码错误', 10001);
    }

    const token = jwt.sign({
      id: userData.id,
    }, this.config.jwt.secret, {
      expiresIn: '10h',
    });

    return {
      token,
      id: userData.id,
      username: userData.username,
    };
  }
}

module.exports = LoginService;
