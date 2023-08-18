const CompanyRepository = require('../3repositories/company.repository');

const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class CompanyService {
  companyRepository = new CompanyRepository();

  // 회사 등록
  addCompany = async (userId, companyName, address, phoneNumber) => {
    if (!companyName) {
      throw new Error('업체명을 입력해주세요.');
    } else if (!address) {
      throw new Error('업체 주소를 입력해주세요.');
    } else if (!phoneNumber) {
      throw new Error('업체 연락처를 입력해주세요.');
    }

    try {
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
        createdAt: addCompanyData.createdAt,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  // 회사 정보 조회 (전체)
  findCompanyAll = async () => {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  };

  // 회사 정보 수정
  updateCompanyInfo = async (companyId, userId, companyName, address, phoneNumber) => {
    const companyCheck = await this.companyRepository.searchOneCompany(companyId);

    if (!companyCheck) {
      throw new Error('업체 등록 번호를 다시 확인해주세요.');
    } else if (!companyName) {
      throw new Error('업체명을 입력해주세요.');
    } else if (!address) {
      throw new Error('업체 주소를 입력해주세요.');
    } else if (!phoneNumber) {
      throw new Error('업체 연락처를 입력해주세요.');
    }

    try {
      await this.companyRepository.updateCompanyInfo(
        companyId,
        userId,
        companyName,
        address,
        phoneNumber
      );

      const updatedData = await this.companyRepository.searchOneCompany(companyId);

      return {
        companyId: updatedData.companyId,
        userId: updatedData.userId,
        companyName: updatedData.companyName,
        address: updatedData.address,
        phoneNumber: updatedData.phoneNumber,
        createdAt: updatedData.createdAt,
        updatedAt: updatedData.updatedAt,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  // 회사 정보 삭제
  deleteCompany = async (companyId, sureDelete) => {
    const companyCheck = await this.companyRepository.searchOneCompany(companyId);

    if (!companyCheck) {
      throw new Error('업체 등록 번호를 다시 확인해주세요.');
    }

    if (sureDelete !== 'yes') {
      throw new Error("정말 삭제하시겠다면 'sureDelete':'yes'라고 입력해주세요.");
    }

    try {
      return await this.companyRepository.deleteCompanyInfo(companyId);
    } catch (error) {
      throw new Error(error);
    }
  };

}

module.exports = CompanyService;
