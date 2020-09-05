'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const auth = middleware.auth();

  // router.get('/', controller.home.index);

  router.post('/login', controller.access.login);
  router.post('/api/logout', controller.access.logout);
  router.get('/api/users', controller.user.index);
  router.get('/api/users/:id', controller.user.show);
  router.post('/api/users', controller.user.create);
  router.put('/api/users/:id', controller.user.update);
  router.delete('/api/users/:id', controller.user.remove);
  router.delete('/api/users', controller.user.removes);


  // role 接口是一个curd 接口模板
  router.get('/api/roles/test', controller.role.test); // 批量生成测试数据
  router.get('/api/roles', controller.role.index);
  router.get('/api/roles/:id', controller.role.show);
  router.post('/api/roles', controller.role.create);
  router.put('/api/roles/:id', controller.role.update);
  router.delete('/api/roles/:id', controller.role.remove);
  router.delete('/api/roles', controller.role.removes);
};
