const { Company } = require('../0models');

const { Op } = require('sequelize');

class CompanyRepository {
  // 회사 등록
  addCompany = async (userId, companyName, address, phoneNumber) => {
    const addCompanyData = await Company.create({
      userId: userId,
      companyName: companyName,
      address: address,
      phoneNumber: phoneNumber,
    });

    return addCompanyData;
  };

  // 회사 정보 조회 (전체)
  findCompanyAll = async () => {
    return await Company.findAll();
  };

  // userId로 회사 조회
  companyId = async (userId) => {
    try {
      const getAllCompany = await Company.findAll({
        where: { userId: userId },
      });

      return getAllCompany;
    } catch (error) {
      console.error('에러 발생:', error);
      throw error;
    }
  };

  // 회사 번호로 조회1
  searchOneCompany = async (companyId) => {
    return await Company.findOne({
      where: { companyId: companyId },
    });
  };

  // 회사 번호로 조회2
  searchOneCompany2 = async (userId, companyId) => {
    return await Company.findAll({
      where: { companyId: companyId, userId: userId },
    });
  };

  // 회사 정보 수정
  updateCompanyInfo = async (companyId, companyName, address, phoneNumber) => {
    await Company.update(
      {
        companyName: companyName,
        address: address,
        phoneNumber: phoneNumber,
      },
      { where: { companyId: companyId } }
    );
    return;
  };

  // 회사 정보 삭제
  deleteCompanyInfo = async (companyId) => {
    return await Company.destroy({ where: { companyId: companyId } });
  };
}

module.exports = CompanyRepository;
