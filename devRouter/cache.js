const express = require('express');
const router = express.Router();

// const {permissionCache, PermissionCacheHandler} = require("../cache/permissionCache");
const permissionCache = require('../cache/permissionCache');

router.get('/', (req, res, next) => {
  const cache = permissionCache.getCache();

  return res.status(200).json({ cacheResult: cache });
});

module.exports = router;
