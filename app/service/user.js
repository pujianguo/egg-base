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
    return await this.ctx.model.User.findOne({ phone: value }).select('password');
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
    if (search.name) {
      query.name = { $regex: search.name };
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
    if (user) ctx.error(409, '用户名已存在');
    payload.password = ctx.helper.crypto(payload.password);
    return await ctx.model.User.create(payload);
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

  // 关注
  async following(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(ctx.state.userId).select('+following');
    if (!me) ctx.error(404, 'user not found');
    if (!me.following.map(id => id.toString()).includes(id)) {
      me.following.push(id);
      await ctx.model.User.findByIdAndUpdate(userId, { following: me.following });
    }
  }
  // 取消关注
  async unfollowing(id) {
    const { ctx } = this;
    const userId = ctx.state.userId;
    const me = await ctx.model.User.findById(ctx.state.userId).select('+following');
    if (!me) ctx.error(404, 'user not found');
    const index = me.following.map(id => id.toString()).indexOf(id);
    if (index > -1) {
      me.following.splice(index, 1);
      await ctx.model.User.findByIdAndUpdate(userId, { following: me.following });
    }
  }
  // 获取关注人列表
  async listFollowing(id) {
    const user = await this.ctx.model.User.findById(id).select('+following').populate('following');
    if (!user) this.ctx.error(404, 'user not found');
    return user.following;
  }
  // 获取粉丝列表
  async listFollowers(id) {
    const users = await this.ctx.model.User.find({ following: id });
    return users;
  }
}

module.exports = UserService;
