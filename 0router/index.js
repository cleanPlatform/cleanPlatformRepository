const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const companyRouter = require('./company.router');
const offerRouter = require('./offer.router');
const loginRouter = require('./login.router');
const reservationRouter = require('./reservation.router');
// const reviewRouter = require('./review.router');

const defaultRoutes = [
  {
    path: '/reservations',
    route: reservationRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },

  {
    path: '/user',
    route: userRouter,
  },

  {
    path: '/company',
    route: companyRouter,
  },
  {
    path: '/offer',
    route: offerRouter,
  },
  {
    path: '/sign',
    route: loginRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
