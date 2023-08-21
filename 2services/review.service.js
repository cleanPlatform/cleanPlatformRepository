const ReviewRepository = require('../3repositories/review.repository');
const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class ReviewService {
  reviewRepository = new ReviewRepository();

  createReview = async (userId, companyId, content, rates) => {
    if (isNaN(companyId)) {
      throw new ApiError(400, 'Wrong data format');
    }

    const result = await this.reviewRepository.createReview(userId, companyId, content, rates);

    if (!result) {
      throw new ApiError(400, 'failed to create a review');
    }

    return result;
  };

  getReviews = async (companyId) => {
    if (isNaN(companyId)) {
      throw new ApiError(400, 'Wrong data format');
    }

    const result = await this.reviewRepository.getReviews(companyId);

    if (result.length <= 0) {
      throw new ApiError(204, 'empty review list');
    }

    return result;
  };

  updateReview = async (userId, reviewId, content) => {
    if (isNaN(reviewId)) {
      throw new ApiError(400, 'Wrong data format');
    }

    const existReview = await this.reviewRepository.getReview(reviewId);

    if (!existReview) {
      throw new ApiError(404, 'Review Not Found');
    }

    if (existReview.userId !== userId) {
      throw new ApiError(403, 'Permission denied');
    }

    const result = await this.reviewRepository.updateReview(reviewId, content);

    if (!result) {
      throw new ApiError(400, 'failed to update a review');
    }

    return result;
  };

  deleteReview = async (userId, reviewId) => {
    if (isNaN(reviewId)) {
      throw new ApiError(400, 'Wrong data format');
    }

    const existReview = await this.reviewRepository.getReview(reviewId);

    if (!existReview) {
      throw new ApiError(404, 'Review Not Found');
    }

    if (existReview.userId !== userId) {
      throw new ApiError(403, 'Permission denied');
    }

    const result = await this.reviewRepository.deleteReview(reviewId);

    if (!result) {
      throw new ApiError(400, 'failed to remove a review');
    }

    return result;
  };
}

module.exports = ReviewService;
