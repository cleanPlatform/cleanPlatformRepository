const OfferService = require('../2services/offer.service');
const ApiError = require('../utils/apierror');

class OfferController {
  offerService = new OfferService();

  // 업체 서비스 생성
  createOffer = async (req, res, next) => {
    const { companyId } = req.params;

    try {
      const { offerName, offerNumber, price } = req.body;

      const userId = res.locals.userId;

      const create = await this.offerService.createOffer(
        userId,
        companyId,
        offerName,
        offerNumber,
        price
      );
      return res.status(201).json({ message: '생성 완료', data: create });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 업체 서비스 수정
  putOffer = async (req, res, next) => {
    const { companyId, offerId } = req.params;

    try {
      const { offerName, offerNumber, price } = req.body;

      const userId = res.locals.userId;

      const put = await this.offerService.updateOffer(
        offerId,
        companyId,
        userId,
        offerName,
        offerNumber,
        price
      );
      return res.status(201).json({ message: '수정 완료', data: put });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 업체 서비스 삭제
  deleteOffer = async (req, res, next) => {
    const { offerId } = req.params;

    try {
      const userId = res.locals.userId;

      const destroy = await this.offerService.destroyOffer(offerId, userId);
      return res.status(201).json({ message: '삭제 완료', data: destroy });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 업체 서비스 전체 조회
  getOffer = async (req, res, next) => {
    const userId = res.locals.userId;

    console.log('companyId :', companyId);
    try {
      const findAllMessage = await this.offerService.findAllOffer(userId, companyId);
      return res.status(201).json({ message: '조회 완료', data: findAllMessage });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 내 업체 조회
  myOffers = async (req, res, next) => {
    try {
      const userId = res.locals.userId;
      const { companyId } = req.params;
      console.log('companyId :', companyId);

      const findOneMessage = await this.offerService.findMyOffer(companyId, userId);
      return res.status(201).json({ message: '내 서비스 완료', data: findOneMessage });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 업체 서비스 상세 조회
  onlyget = async (req, res, next) => {
    const { offerId } = req.params;

    try {
      const userId = res.locals.userId;

      const findOneMessage = await this.offerService.findOneOffer(offerId, userId);
      return res.status(201).json({ message: '상세 조회 완료', data: findOneMessage });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = OfferController;
