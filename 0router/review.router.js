const express = require('express');
const router = express.Router();

const ReviewController = require('../1controllers/review.controller');
const reviewController = new ReviewController();

// const authMiddleware = require('../middlewares/');

// router.post('/me/reservations/:reservationId', reviewController.createReview);
// router.get('/companies/:companyId/reviews', reviewController.referReview);

module.exports = router;
