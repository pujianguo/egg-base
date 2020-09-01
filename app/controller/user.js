'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const query = ctx.query;
    const offset = Number(query.offset) || 0;
    const limit = Number(query.limit) || this.app.config.pageSize;
    ctx.result(await this.service.user.list(offset, limit));
  }

  async get() {
    const { ctx } = this;
    ctx.result({
      data: ctx.params.id,
    });
  }

  async create() {
    const { ctx } = this;
    ctx.body = ctx.request.body;
  }

  async update() {
    const { ctx } = this;
    ctx.body = ctx;
  }

  async delete() {
    const { ctx } = this;
    ctx.body = ctx;
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    ctx.result(await ctx.service.login.login(username, password));
  }

}

module.exports = UserController;
