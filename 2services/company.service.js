const CompanyRepository = require('../3repositories/company.repository');

const ApiError = require('../utils/apierror');

const { verificationPhoneNumber } = require('../middlewares/verificationReg-middleware');

class CompanyService {
  companyRepository = new CompanyRepository();

  // 회사 등록
  addCompany = async (userId, companyName, address, phoneNumber) => {
    if (!companyName) {
      throw new ApiError(400, '업체명을 입력해주세요');
    }
    if (!address) {
      throw new ApiError(400, '업체 주소를 입력해주세요.');
    }
    if (!phoneNumber) {
      throw new ApiError(400, '업체 연락처를 입력해주세요.');
    }

    // 전화번호 검증
    verificationPhoneNumber(phoneNumber);

    const addCompanyData = await this.companyRepository.addCompany(
      userId,
      companyName,
      address,
      phoneNumber
    );

    return {
      companyId: addCompanyData.companyId,
      userId: addCompanyData.userId,
      companyName: addCompanyData.companyName,
      address: addCompanyData.address,
      phoneNumber: addCompanyData.phoneNumber,
    };
  };

  // 회사 정보 조회 (전체)
  findCompanyAll = async () => {
    const allCompany = await this.companyRepository.findCompanyAll();

    return {
      companyId: allCompany.companyId,
      userId: allCompany.userId,
      companyName: allCompany.companyName,
      address: allCompany.address,
      phoneNumber: allCompany.phoneNumber,
      createdAt: allCompany.createdAt,
      updatedAt: allCompany.updatedAt,
    };
  };

  //  나희 회사 조회
  getMyCompany = async (userId) => {
    const getAllCompanyRepository = await this.companyRepository.companyId(userId);

    return getAllCompanyRepository;
  };

  // 회사 정보 수정
  updateCompanyInfo = async (companyId, companyName, address, phoneNumber) => {
    const companyCheck = await this.companyRepository.searchOneCompany(companyId);

    if (!companyCheck) {
      throw new ApiError(400, '업체 등록 번호를 다시 확인해주세요.');
    } else if (!companyName) {
      throw new ApiError(400, '업체명을 입력해주세요.');
    } else if (!address) {
      throw new ApiError(400, '업체 주소를 입력해주세요.');
    } else if (!phoneNumber) {
      throw new ApiError(400, '업체 연락처를 입력해주세요.');
    }

    // 전화번호 검증
    verificationPhoneNumber(phoneNumber);

    await this.companyRepository.updateCompanyInfo(
      companyId,
      userId,
      companyName,
      address,
      phoneNumber
    );
  };

  // 회사 정보 삭제
  deleteCompany = async (companyId, sureDelete) => {
    console.log('삭제 서비스 진입', sureDelete);
    const companyCheck = await this.companyRepository.searchOneCompany(companyId);

    if (!companyCheck) {
      throw new ApiError(400, 'W업체 등록 번호를 다시 확인해주세요.');
    }

    if (sureDelete !== true) {
      throw new ApiError(400, "정말 삭제하시겠다면 'sureDelete':'yes'라고 입력해주세요.");
    }

    return await this.companyRepository.deleteCompanyInfo(companyId);
  };
}

module.exports = CompanyService;
