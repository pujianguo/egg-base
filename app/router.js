'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const auth = middleware.auth();

  router.get('/', controller.home.index);

  router.post('/users/login', controller.user.login);
  router.get('/users', auth, controller.user.index);
  router.get('/users/:id', auth, controller.user.get);
  router.post('/users', auth, controller.user.create);
  router.put('/users/:id', auth, controller.user.update);
  router.delete('/users/:id', auth, controller.user.delete);
};
