'use strict';

const crypto = require('crypto');
const Service = require('egg').Service;

class UserService extends Service {
  async index(payload) {
    const { ctx } = this;
    let { offset, limit, ...search } = payload;
    let res = [];
    let count = 0;
    offset = Number(offset) || 0;
    limit = Number(limit) || this.config.pageSize;

    const query = {};
    if (search.name) {
      query.name = { $regex: search.name }; // 模糊匹配
    }
    if (search.access) {
      query.access = search.access;
    }

    res = await ctx.model.User.find(query).skip(offset).limit(limit)
      .sort({ createdAt: -1 })
      .exec();
    count = await ctx.model.User.count(query).exec();

    return { count, items: res };
  }

  async add(username, password) {
    // 检测用户是否存在
    const userInfo = await this.getUserInfoByUserName(username);
    if (userInfo.token) this.ctx.error(400, '用户名已存在');

    const newPwd = crypto.createHmac('sha256', passWord)
      .update(this.app.config.user_pwd_salt_addition)
      .digest('hex');

    // 新增用户
    const token = this.app.randomString();
    const user = this.ctx.model.User();
    user.user_name = userName;
    user.pass_word = newPwd;
    user.token = token;
    user.usertoken = token;
    user.create_time = new Date();
    const result = await user.save() || {};
    result.pass_word = '';

    // 设置redis登录态
    this.app.redis.set(`${token}_user_login`, JSON.stringify(result), 'EX', this.app.config.user_login_timeout);
    // 设置登录cookie
    this.ctx.cookies.set('usertoken', token, {
      maxAge: this.app.config.user_login_timeout * 1000,
      httpOnly: true,
      encrypt: true,
      signed: true,
    });

    return result;
  }

  async getUserInfoByUserName(username) {
    return await this.ctx.model.User.findOne({ username }).exec();
  }

}

module.exports = UserService;
