const ReviewService = require('../2services/review.service');
const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class ReviewController {
  ReviewService = new ReviewService();
}

module.exports = ReviewController;
