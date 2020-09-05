'use strict';

module.exports = {
  createUserRequest: {
    phone: { type: 'string', required: true, description: '手机号', example: '18919015125', format: /^1[34578]\d{9}$/ },
    password: { type: 'string', required: true, description: '密码', example: '123456' },
    realName: { type: 'string', required: true, description: '姓名', example: 'Raul' },
  },
  updateUserRequest: {
    phone: { type: 'string', required: true, description: '手机号', example: '18919015125', format: /^1[34578]\d{9}$/ },
    password: { type: 'string', required: true, description: '密码', example: '123456' },
    realName: { type: 'string', required: true, description: '姓名', example: 'Raul' },
  },
};
