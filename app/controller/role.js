'use strict';
const Controller = require('egg').Controller;

class RoleController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      access: { type: 'string', required: true, allowEmpty: false },
    };
  }
  async test() {
    const { service } = this;
    for (let i = 1; i <= 100; i++) {
      await service.role.create({
        name: 'role' + i,
        access: 'access' + (i < 50 ? '1' : '2'),
      });
    }
  }

  async index() {
    const { ctx, service } = this;
    ctx.result(await service.role.index(ctx.query));
  }

  // 获取单个角色
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.role.show(id);
    ctx.result(res);
  }

  // 创建角色
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    ctx.validate(this.createRule, payload);
    const res = await service.role.create(payload);
    ctx.result(res);
  }

  // 修改角色
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    ctx.validate(this.createRule, payload);
    const res = await service.role.update(id, payload);
    ctx.result(res);
  }

  // 删除单个角色
  async remove() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.role.remove(id);
    ctx.result();
  }

  // 删除所选角色(条件id[])
  async removes() {
    const { ctx, service } = this;
    const { ids } = ctx.request.body;
    const payload = ids.split(',') || [];
    await service.role.removes(payload);
    ctx.result();
  }

}


module.exports = RoleController;
