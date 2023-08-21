const { Review } = require('../0models');

class ReviewRepository {
  createReview = async () => {
    const result = await Review.create();
  };

  getReview = async (reviewId) => {
    const result = await Review.findOne({ where: { reviewId } });

    return result;
  };

  getReviews = async (companyId) => {
    const result = await Review.findAll({ where: { companyId } });

    return result;
  };

  updateReview = async (reviewId, content) => {
    const result = await Review.update({ comment: content }, { where: { reviewId } });

    return result;
  };

  deleteReview = async (reviewId) => {
    const result = await Review.destroy({ where: { reviewId } });
  };
}

module.exports = ReviewRepository;
