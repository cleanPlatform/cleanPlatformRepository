const express = require('express');
const router = express.Router();

const cacheRouter = require('../cache');

const defaultRoutes = [
  {
    path: '/cache',
    route: cacheRotuer,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
