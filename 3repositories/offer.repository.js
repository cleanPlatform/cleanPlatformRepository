const { Offer, sequelize } = require('../0models');

class OfferRepository {
  // 업체 서비스 생성
  createOffer = async (userId, companyId, offerName, offerNumber, price) => {
    try {
      const createRepository = await Offer.create({
        userId,
        companyId,
        offerName,
        offerNumber,
        price,
      });

      return createRepository;
    } catch (error) {
      throw error;
    }
  };

  // 업체 서비스 수정
  updateOffer = async (offerId, companyId, userId, offerName, offerNumber, price) => {
    try {
      const updateRepository = await Offer.update(
        {
          offerName,
          offerNumber,
          price,
        },
        {
          where: { offerId },
        }
      );

      return updateRepository;
    } catch (error) {
      throw error;
    }
  };

  //업체 서비스 삭제 id 조회
  findOffer = async (offerId) => {
    try {
      const findOffer = await Offer.findOne({ where: { offerId: offerId } });
      return findOffer;
    } catch (error) {
      throw error;
    }
  };

  // 업체 서비스 삭제
  destroyOffer = async (offerId, userId) => {
    try {
      const destroyRepository = await Offer.destroy({
        where: { offerId, userId },
      });

      await t.commit();
      return destroyRepository;
    } catch (error) {
      throw error;
    }
  };

  // 업체 서비스 전체 조회

  findAllOffer = async (companyId) => {
    const offer = await Offer.findAll({ where: { companyId } });

    return offer;
  };

  // 업체 서비스 상세 조회
  findOneOffer = async (offerId) => {
    const findOffer = await Offer.findOne({ where: { offerId } });

    return findOffer;
  };
}

module.exports = OfferRepository;
