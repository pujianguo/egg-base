'use strict';

module.exports = {
  loginResponse: {
    _id: { type: 'string', description: 'id 唯一键' },
    phone: { type: 'string', description: '手机' },
    realName: { type: 'string', description: '用户姓名' },
    avatar: { type: 'string', description: '头像' },
    token: { type: 'string', description: 'Token' },
  },
};
