'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async list(offset, limit) {
    const list = [];
    const startNumber = offset + 1;
    const endNumber = offset + limit;
    for (let i = startNumber; i <= endNumber; i++) {
      list.push({
        id: i,
        name: 'name' + i,
        age: 20 + i,
      });
    }
    return {
      count: 0,
      items: list,
    };
  }

}

module.exports = UserService;
