'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
  // common function
  async find(id) {
    const topic = await this.ctx.model.Topic.findById(id);
    if (!topic) this.ctx.error(404, 'topic not found');
    return topic;
  }
  async findByName(value) {
    return await this.ctx.model.Topic.findOne({ name: value });
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
    if (search.name) {
      query.name = { $regex: search.name }; // 模糊匹配
    }
    if (search.access) {
      query.access = search.access;
    }

    if (!is_all) {
      res = await ctx.model.Topic.find(query).skip(offset).limit(limit)
        .sort({ createdAt: -1 })
        .exec();
    } else {
      res = await ctx.model.Topic.find(query)
        .sort({ createdAt: -1 })
        .exec();
    }
    count = await ctx.model.Topic.count(query).exec();

    return { count, items: res };
  }
  async show(id) {
    return await this.find(id);
  }
  async create(payload) {
    const { ctx } = this;
    const topic = await this.findByName(payload.name);
    if (topic) ctx.error(423, '该角色已存在');
    return await ctx.model.Topic.create(payload);
  }
  async update(id, data) {
    const { ctx } = this;
    await this.find(id); // 检查是否存在
    return await ctx.model.Topic.findByIdAndUpdate(id, data);
  }

  async remove(id) {
    const { ctx } = this;
    await this.find(id);
    // 不做存在判断时，不存在 findByIdAndRemove 任然返回true
    return await ctx.model.Topic.findByIdAndRemove(id);
  }
  async removes(ids) {
    return await this.ctx.model.Topic.remove({ _id: { $in: ids } });
  }
}

module.exports = TopicService;
