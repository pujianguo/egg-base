'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const auth = middleware.auth();

  // router.get('/', controller.home.index);

  /** ******************** 用户 ******************** **/
  router.post('/login', controller.access.login);
  router.post('/api/logout', controller.access.logout);
  router.get('/api/users', controller.user.index);
  router.get('/api/users/:id', controller.user.show);
  router.post('/api/users', controller.user.create);
  router.put('/api/users/:id', controller.user.update);
  router.delete('/api/users/:id', controller.user.remove);
  router.delete('/api/users', controller.user.removes);
  // 关注
  router.get('/api/users/:id/following', controller.user.listFollowing);
  router.get('/api/users/:id/followers', controller.user.listFollowers);
  router.put('/api/users/following/:id', controller.user.following);
  router.delete('/api/users/following/:id', controller.user.unfollowing);

  /** ******************** 话题 ******************** **/
  // router.get('/api/topics', controller.topic.index);
  // router.get('/api/topics/:id', controller.topic.show);
  // router.post('/api/topics', controller.topic.create);
  // router.patch('/api/topics/:id', controller.topic.update);
  // router.get('/api/topics/:id/followers', controller.topic.listFollowers);
  // router.get('/api/topics/:id/questions', controller.topic.listQuestions);


  /** ******************** 角色管理 ******************** **/
  // role 接口是一个curd 接口模板
  router.get('/api/roles/test', controller.role.test); // 批量生成测试数据
  router.get('/api/roles', controller.role.index);
  router.get('/api/roles/:id', controller.role.show);
  router.post('/api/roles', controller.role.create);
  router.put('/api/roles/:id', controller.role.update);
  router.delete('/api/roles/:id', controller.role.remove);
  router.delete('/api/roles', controller.role.removes);
};
