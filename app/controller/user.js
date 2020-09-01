'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.result(await service.user.list(ctx.query));
  }

  async show() {
    const { ctx } = this;
    ctx.result({
      data: ctx.params.id,
    });
  }

  async create() {
    const { ctx } = this;
    const payload = ctx.request.body || {};

    ctx.body = { payload };
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};

    ctx.body = { id, payload };
  }

  async remove() {
    const { ctx } = this;
    const { id } = ctx.params;

    ctx.body = id;
  }
  async removes() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const payload = ids.split(',') || [];

    ctx.body = payload;
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    ctx.result(await ctx.service.login.login(username, password));
  }

}

module.exports = UserController;
