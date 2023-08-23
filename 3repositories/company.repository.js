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
    return await Company.findOne({
      where: { userId: userId },
    });
  };

  // 회사 번호로 조회
  searchOneCompany = async (companyId) => {
    return await Company.findOne({
      where: { companyId: companyId },
    });
  };

  // 회사 정보 수정
  updateCompanyInfo = async (companyId, userId, companyName, address, phoneNumber) => {
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
