'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 用户管理
 */
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

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /users
   * @request body createUserRequest *body
   * @response 200 createdResponse 创建成功
   */
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

  /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /users/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 removedResponse 创建成功
   */
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
