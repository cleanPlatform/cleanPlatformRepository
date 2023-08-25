const OfferService = require('../2services/offer.service');

class OfferController {
  offerService = new OfferService();

  // 업체 서비스 생성
  createOffer = async (req, res, next) => {
    const { offerName, offerNumber, price } = req.body;

    const { companyId } = req.params;

    const userId = res.locals.userId;

    const { status, message } = await this.offerService.createOffer(
      userId,
      companyId,
      offerName,
      offerNumber,
      price
    );
    res.status(status).json(message);
  };

  // 업체 서비스 수정
  putOffer = async (req, res, next) => {
    const { offerName, offerNumber, price } = req.body;

    const { companyId, offerId } = req.params;

    const userId = res.locals.userId;

    const { status, message } = await this.offerService.updateOffer(
      offerId,
      companyId,
      userId,
      offerName,
      offerNumber,
      price
    );

    res.status(status).json(message);
  };

  // 업체 서비스 삭제
  deleteOffer = async (req, res, next) => {
    const { offerId } = req.params;

    const userId = res.locals.userId;

    const { status, message } = await this.offerService.destroyOffer(offerId, userId);
    res.status(status).json(message);
  };

  // 업체 서비스 전체 조회
  getOffer = async (req, res, next) => {
    const findAllMessage = await this.offerService.findAllOffer();
    res.status(200).json({ data: findAllMessage });
  };

  // 업체 서비스 상세 조회
  onlyget = async (req, res, next) => {
    const { offerId } = req.params;

    // const userId = res.locals.user

    const findOneMessage = await this.offerService.findOneOffer(offerId);
    res.status(200).json({ data: findOneMessage });
  };
}

module.exports = OfferController;
