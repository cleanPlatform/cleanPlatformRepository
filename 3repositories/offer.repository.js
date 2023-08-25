const { Offer, sequelize } = require('../0models');

class OfferRepository {
  // 업체 서비스 생성
  createOffer = async (userId, companyId, offerName, offerNumber, price) => {
    const t = await sequelize.transaction();

    try {
      const createRepository = await Offer.create(
        {
          userId,
          companyId,
          offerName,
          offerNumber,
          price,
        },
        { transaction: t }
      );

      await t.commit();
      return createRepository;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 업체 서비스 수정
  updateOffer = async (offerId, companyId, userId, offerName, offerNumber, price) => {
    const t = await sequelize.transaction();

    try {
      const updateRepository = await Offer.update(
        {
          offerName,
          offerNumber,
          price,
        },
        {
          where: { offerId },
          transaction: t,
        }
      );

      await t.commit();
      return updateRepository;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  //업체 서비스 삭제 id 조회
  findOffer = async (offerId) => {
    const t = await sequelize.transaction();

    try {
      const findOffer = await Offer.findOne({ where: { offerId: offerId } });
      await t.commit();
      return findOffer;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 업체 서비스 삭제
  destroyOffer = async (offerId, userId) => {
    const t = await sequelize.transaction();

    try {
      const destroyRepository = await Offer.destroy({
        where: { offerId },
        transaction: t,
      });

      await t.commit();
      return destroyRepository;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 업체 서비스 전체 조회

  findAllOffer = async () => {
    const offer = await Offer.findAll();

    return offer;
  };

  // 업체 서비스 상세 조회
  findOneOffer = async (offerId) => {
    const findOffer = await Offer.findOne({ where: { offerId } });

    return findOffer;
  };
}

module.exports = OfferRepository;
