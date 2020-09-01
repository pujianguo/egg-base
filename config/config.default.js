/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598924968259_1043';

  config.pageSize = 10;

  config.security = {
    csrf: false,
  };
  config.bodyParser = {
    jsonLimit: '1mb', // 默认 100kb
    formLimit: '1mb',
  };

  config.jwt = {
    secret: 'jsonwebtoken_secret',
  };

  // add your middleware config here
  config.middleware = [
    'errorHandler',
    'notfoundHandler',
    // 'auth',
  ];
  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   // match: '/api',
  // };
  // config.auth = {
  //   ignore: [ '/front/article', '/front/tag', '/api/login' ],
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
