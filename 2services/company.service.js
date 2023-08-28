const OfferRepository = require('../3repositories/offer.repository');
const CompanyRepository = require('../3repositories/company.repository');
const UserRepository = require('../3repositories/user.repository');

class OfferService {
  OfferRepository = new OfferRepository();
  CompanyRepository = new CompanyRepository();
  UserRepository = new UserRepository();

  // 업체 서비스 생성
  createOffer = async (userId, companyId, offerName, offerNumber, price) => {
    try {
      if (!offerName) return { status: 400, message: '업체 이름을 넣어주세요' };
      if (!offerNumber) return { status: 400, message: '업체 전화번호를 넣어주세요' };
      if (!price) return { status: 400, message: '가격을 넣어주세요' };

      // 유저 조회 기능
      const findUser = await this.UserRepository.findUserOne(userId);
      if (!findUser) return { status: 401, message: ' 유저가 없습니다.' };

      // 업체 조회 기능
      const findeService = await this.CompanyRepository.searchOneCompany(companyId);
      if (!findeService) return { status: 401, message: ' 업체가 없습니다.' };

      // 업체 id랑 userid는 기능 생성 후 로직 추가 예정
      const CreateService = await this.OfferRepository.createOffer(
        userId,
        companyId,
        offerName,
        offerNumber,
        price
      );
      return { status: 200, message: '서비스가 생성되었습니다.', CreateService };
    } catch (error) {
      console.error(error);
      return { status: 500, massge: '서버오류' };
    }
  };

  // 업체 서비스 수정
  updateOffer = async (offerId, companyId, userId, offerName, offerNumber, price) => {
    try {
      if (!offerName) return { status: 400, message: '업체 이름을 넣어주세요' };
      if (!offerNumber) return { status: 400, message: '업체 전화번호를 넣어주세요' };
      if (!price) return { status: 400, message: '가격을 넣어주세요' };

      // 유저 조회 기능
      const findUser = await this.UserRepository.findUserOne(userId);
      if (!findUser) return { status: 401, message: ' 유저가 없습니다.' };

      // 업체 조회 기능
      const findeService = await this.CompanyRepository.searchOneCompany(companyId);
      if (!findeService) return { status: 400, message: ' 업체가 없습니다.' };

      // 서비스 조회 기능
      const findUpdate = await this.OfferRepository.findOffer(offerId);

      if (!findUpdate) return { status: 400, message: '서비스가 없습니다.' };

      if (offerName === findUpdate.offerName) {
        return { status: 400, message: '이미 동일한 서비스 이름이 있습니다.' };
      }

      if (findUpdate.offerNumber === offerNumber)
        // paseInt 넘버로 바꾸거나 body 값에서 1부터넣으면 됨
        return { status: 400, message: '동일한 번호로 수정이 불가능합니다.' };

      const updateService = await this.OfferRepository.updateOffer(
        offerId,
        companyId,
        userId,
        offerName,
        offerNumber,
        price
      );
      return { status: 200, message: '서비스가 수정 되었습니다.', updateService };
    } catch (error) {
      console.error(error);
      return { status: 500, massge: '서버오류' };
    }
  };

  // 업체 서비스 삭제
  destroyOffer = async (offerId, userId) => {
    try {
      // 서비스 조회 기능
      const findDestroy = await this.OfferRepository.findOffer(offerId);
      if (!findDestroy) return { status: 400, message: '서비스가 없습니다.' };

      // 유저 조회 기능
      const findUser = await this.UserRepository.findUserOne(userId);
      if (!findUser) return { status: 401, message: ' 유저가 없습니다.' };

      const destroyService = await this.OfferRepository.destroyOffer(offerId, userId);
      return { status: 200, message: '서비스가 삭제 되었습니다.', destroyService };
    } catch (error) {
      console.error(error);
      return { status: 500, massge: '서버오류' };
    }
  };

  // 업체 서비스 전체 조회
  findAllOffer = async () => {
    const findAll = await this.OfferRepository.findAllOffer();

    return findAll;
  };

  // 업체 서비스 상세 조회
  findOneOffer = async (offerId) => {
    try {
      const findOne = await this.OfferRepository.findOneOffer(offerId);
      if (!findOne) return { status: 400, message: '조회된 서비스가 없습니다.' };

      return findOne;
    } catch (error) {
      console.error(error);
      return { status: 500, massge: '서버오류' };
    }
  };
}
module.exports = OfferService;
