const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const companyRouter = require('./company.router');
const offerRouter = require('./offer.router');
// const reservationRouter = require('./reservation.router');
// const reviewRouter = require('./review.router');

const defaultRoutes = [
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
  // {
  //   path: '/',
  //   route: reservationRouter,
  // },
  //   {
  //     path: '/review',
  //     route: reviewRouter,
  //   },
  // {
  //   path: '',
  //   route: ,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
