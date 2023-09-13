const OfferRepository = require('../3repositories/offer.repository');
const CompanyRepository = require('../3repositories/company.repository');
const UserRepository = require('../3repositories/user.repository');
const ApiError = require('../utils/apierror');

class OfferService {
  OfferRepository = new OfferRepository();
  CompanyRepository = new CompanyRepository();
  UserRepository = new UserRepository();

  // 업체 서비스 생성
  createOffer = async (userId, companyId, offerName, offerNumber, price) => {
    console.log('오퍼 서비스 진입');
    if (!offerName) {
      throw new ApiError(400, '업체 이름을 넣어주세요');
    }
    if (!offerNumber) {
      throw new ApiError(400, '업체 전화번호를 넣어주세요');
    }

    if (!price) {
      throw new ApiError(400, '가격을 넣어주세요');
    }

    console.log('오퍼 검증 통과');

    // 유저 조회 기능
    const findUser = await this.UserRepository.findUserOne(userId);
    if (!findUser) {
      throw new ApiError(401, ' 유저가 없습니다.');
    }

    console.log('오퍼 유저조회 통과');

    // 업체 조회 기능
    const findeService = await this.CompanyRepository.searchOneCompany(companyId);
    if (!findeService) {
      throw new ApiError(401, ' 업체가 없습니다.');
    }

    console.log('오퍼 업체조회 통과');

    // 업체 id랑 userid는 기능 생성 후 로직 추가 예정
    const createService = await this.OfferRepository.createOffer(
      userId,
      companyId,
      offerName,
      offerNumber,
      price
    );

    if (!createService) {
      throw new ApiError(404, '서비스 생성 실패');
    }

    return createService;
  };

  // 업체 서비스 수정
  updateOffer = async (offerId, companyId, userId, offerName, offerNumber, price) => {
    if (!offerName) {
      throw new ApiError(400, '업체 이름을 넣어주세요');
    }
    if (!offerNumber) {
      throw new ApiError(400, '업체 전화번호를 넣어주세요');
    }
    if (!price) {
      throw new ApiError(400, '가격을 넣어주세요');
    }

    // 유저 조회 기능
    const findUser = await this.UserRepository.findUserOne(userId);
    if (!findUser) {
      throw new ApiError(401, ' 유저가 없습니다.');
    }

    // 업체 조회 기능
    const findeService = await this.CompanyRepository.searchOneCompany(companyId);
    if (!findeService) {
      throw new ApiError(400, ' 업체가 없습니다.');
    }

    // 서비스 조회 기능
    const findUpdate = await this.OfferRepository.findOffer(offerId);

    if (!findUpdate) {
      throw new ApiError(400, '서비스가 없습니다.');
    }

    if (findUpdate.offerName === offerName) {
      throw new ApiError(400, '이미 동일한 서비스 이름이 있습니다.');
    }

    if (findUpdate.offerNumber === offerNumber) {
      throw new ApiError(400, '동일한 번호로 수정이 불가능합니다.');
    }

    const updateService = await this.OfferRepository.updateOffer(
      offerId,
      companyId,
      userId,
      offerName,
      offerNumber,
      price
    );
    if (!updateService) {
      throw new ApiError(404, '서비스 수정 실패');
    }

    return updateService;
  };

  // 업체 서비스 삭제
  destroyOffer = async (offerId, userId) => {
    // 서비스 조회 기능
    const findDestroy = await this.OfferRepository.findOffer(offerId);
    if (!findDestroy) {
      throw new ApiError(400, '서비스가 없습니다.');
    }

    // 유저 조회 기능
    const findUser = await this.UserRepository.findUserOne(userId);
    if (!findUser) {
      throw new ApiError(401, ' 유저가 없습니다.');
    }

    const destroyService = await this.OfferRepository.destroyOffer(offerId, userId);
    if (!destroyService) {
      throw new ApiError(404, '서비스 삭제 실패');
    }

    return destroyService;
  };

  // 업체 서비스 전체 조회
  findAllOffer = async () => {
    const findAll = await this.OfferRepository.findAllOffer();
    if (!findAll) {
      throw new ApiError(404, '서비스 조회 실패');
    }

    return findAll;
  };

  // 업체 서비스 상세 조회
  findOneOffer = async (offerId, userId) => {
    const findOne = await this.OfferRepository.findOneOffer(offerId, userId);
    if (!findOne) {
      throw new ApiError(400, '조회된 서비스가 없습니다.');
    }

    // 유저 조회 기능
    const findUser = await this.UserRepository.findUserOne(userId);
    if (!findUser) {
      throw new ApiError(401, ' 유저가 없습니다.');
    }

    if (!findOne) {
      throw new ApiError(404, '서비스 상세 조회 실패');
    }

    return findOne;
  };
}
module.exports = OfferService;
