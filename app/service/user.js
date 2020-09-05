'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // common function
  async find(id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) this.ctx.error(404, 'user not found');
    return user;
  }
  async findByPhone(value) {
    return await this.ctx.model.User.findOne({ phone: value });
  }

  async list(payload) {
    const { ctx } = this;
    let { offset, limit, is_all, ...search } = payload;
    let res = [];
    let count = 0;
    offset = Number(offset) || 0;
    limit = Number(limit) || this.config.pageSize;
    is_all = Boolean(is_all);

    const query = {};
    if (search.phone) {
      query.phone = { $regex: search.phone };
    }
    if (search.realName) {
      query.realName = { $regex: search.realName };
    }

    if (!is_all) {
      res = await ctx.model.User.find(query).skip(offset).limit(limit)
        .sort({ createdAt: -1 })
        .exec();
    } else {
      res = await ctx.model.User.find(query)
        .sort({ createdAt: -1 })
        .exec();
    }
    count = await ctx.model.User.count(query).exec();

    return { count, items: res };
  }
  async show(id) {
    return await this.find(id);
  }

  async create(payload) {
    const { ctx } = this;
    const user = await this.findByPhone(payload.phone);
    if (user) ctx.error(423, '用户名已存在');
    payload.password = ctx.helper.crypto(payload.password);
    return ctx.model.User.create(payload);
  }

  async update(id, payload) {
    const { ctx } = this;
    await this.find(id);
    return await ctx.model.User.findByIdAndUpdate(id, payload);
  }
  async remove(id) {
    const { ctx } = this;
    await this.find(id);
    return await ctx.model.User.findByIdAndRemove(id);
  }
  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } });
  }
}

module.exports = UserService;
