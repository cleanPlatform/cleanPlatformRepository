const NodeCache = require('node-cache');
const User = require('../0models/user');
// export const permissionCache = new NodeCache();

// export class PermissionCacheHandler {
//   static setPermissionCache = async (cache, userId) => {
//     try {
//       const user = await User.findOne({ where: { userId } });

//       if (!cache.get(`permission${userId}`)) {
//         cache.set(`permission${userId}`, user.permission);
//       }
//       console.log('권한 캐시 저장 성공!');
//     } catch (err) {
//       console.error('권한 캐시 저장 실패: ', err);
//       throw err;
//     }
//   };

//   static getPermissionCache(cache, userId) {
//     const data = cache.get(`permission${userId}`);

//     if (!data) {
//       throw new Error('cache not found');
//     }

//     return data;
//   }

//   static showCache = (cache) => {
//     const arr = [];

//     // for (key of cache.keys()) {
//     //     console.log(cache.get(key));
//     // }

//     if (cache.keys().length <= 0) {
//       console.log('empty cache');
//       return arr;
//     }

//     for (key of cache.keys()) {
//       arr.push({ cacheKey: key, value: cache.get(key) });
//     }

//     return arr;
//   };
// }

class PermissionCache {
  permissionCache = new NodeCache();

  setPermissionCache = async (userId) => {
    console.log('캐시 불러오기');
    try {
      const user = await User.findOne({ where: { userId } });

      if (!this.permissionCache.get(`permission${userId}`)) {
        this.permissionCache.set(`permission${userId}`, user.permission);
      }
      console.log('권한 캐시 저장 성공!');
    } catch (err) {
      console.error('권한 캐시 저장 실패: ', err);
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

    // for (key of cache.keys()) {
    //     console.log(cache.get(key));
    // }

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
