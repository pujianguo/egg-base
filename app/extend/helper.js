'use strict';

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  // 获取mongo查询参数
  getListQueryForMongo(search, allowFields = []) {
    console.log(search, allowFields);
  },
};
