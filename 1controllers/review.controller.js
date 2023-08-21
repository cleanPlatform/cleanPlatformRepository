const ReviewService = require('../2services/review.service');
const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');

class ReviewController {
  reviewService = new ReviewService();

  createReview = async (req, res, next) => {
    // userid는 임의로 body로 받아서 사용
    const { userId, content, rates } = req.body;
    const { companyId } = req.params;

    try {
      await this.reviewService.createReview(userId, companyId, content, rates);

      return res.status(200);
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status);
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  getReviews = async (req, res, next) => {
    const { companyId } = req.params;

    try {
      const result = await this.reviewService.getReviews(companyId);

      return res.status(200).json({ data: result });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status);
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // rates 수정은 못하도록 함
  updateReview = async (req, res, next) => {
    const { userId, content } = req.body;
    const { reviewId } = req.params;

    try {
      await this.reviewService.updateReview(userId, reviewId, content);

      return res.status(200);
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status);
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  deleteReview = async (req, res, next) => {
    const { userId } = req.body;
    const { reviewId } = req.params;

    try {
      await this.reviewService.deleteReview(userId, reviewId);

      return res.status(200);
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status);
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = ReviewController;
