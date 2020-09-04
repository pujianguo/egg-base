'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const auth = middleware.auth();

  router.get('/', controller.home.index);

  // router.post('/users/login', controller.user.login);
  // router.get('/users', auth, controller.user.index);
  // router.get('/users/:id', auth, controller.user.show);
  // router.post('/users', auth, controller.user.create);
  // router.put('/users/:id', auth, controller.user.update);
  // router.delete('/users/:id', auth, controller.user.remove);


  // role 接口是一个curd 接口模板
  router.get('/roles/test', controller.role.test); // 批量生成测试数据
  router.get('/roles', controller.role.index);
  router.get('/roles/:id', controller.role.show);
  router.post('/roles', controller.role.create);
  router.put('/roles/:id', controller.role.update);
  router.delete('/roles/:id', controller.role.remove);
  router.delete('/roles', controller.role.removes);
};
