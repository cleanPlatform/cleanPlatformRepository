const NodeCache = require('node-cache');
const User = require('../0models/user');

class PermissionCache {
  permissionCache = new NodeCache();

  setPermissionCache = async (userId) => {
    try {
      const user = await User.findOne({ where: { userId } });

      if (!this.permissionCache.get(`permission${userId}`)) {
        this.permissionCache.set(`permission${userId}`, user.permission);
      }
    } catch (err) {
      console.error('권한 캐시 저장 실패: ', err);
      throw err;
    }
  };

  // 로그아웃시 캐시 삭제
  clearCache = async (userId) => {
    try {
      const cacheKey = `permission${userId}`;
      if (this.permissionCache.get(cacheKey)) {
        this.permissionCache.del(cacheKey);
        console.log(`권한 캐시 (${cacheKey}) 삭제 성공!`);
      } else {
        console.log(`권한 캐시 (${cacheKey})를 찾을 수 없음`);
      }
    } catch (err) {
      console.error('권한 캐시 삭제 실패: ', err);
      throw err;
    }
  };

  getPermissionCache = (userId) => {
    const data = this.permissionCache.get(`permission${userId}`);

    if (!data) {
      throw new Error('cache not found');
    }

    return data;
  };

  getCache = () => {
    const arr = [];

    if (this.permissionCache.keys().length <= 0) {
      console.log('empty cache');
      return arr;
    }

    for (const key of this.permissionCache.keys()) {
      arr.push({ cacheKey: key, value: this.permissionCache.get(key) });
    }

    return arr;
  };
}

module.exports = new PermissionCache();
