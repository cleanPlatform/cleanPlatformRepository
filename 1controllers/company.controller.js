const CompanyService = require('../2services/company.service');

class CompanyController {
  companyService = new CompanyService();

  // 회사 등록
  createCompany = async (req, res) => {
    const { userId } = res.locals.userId;
    const { companyName, address, phoneNumber } = req.body;

    try {
      const addCompanyData = await this.companyService.addCompany(
        userId,
        companyName,
        address,
        phoneNumber
      );

      return res.status(200).json({ data: addCompanyData, message: '업체 등록이 완료되었습니다.' });
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message });
    }
  };

  // 회사 정보 조회
  getCompanyInfo = async (req, res) => {
    try {
      const companyInfoAll = await this.companyService.findCompanyAll();
      return res.status(200).json({ data: companyInfoAll });
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message });
    }
  };

  // 회사 정보 수정
  updateCompanyInfo = async (req, res) => {
    const { companyId } = req.params;
    const { userId } = res.locals.userId;
    const { companyName, address, phoneNumber } = req.body;

    try {
      const updatedData = await this.companyService.updateCompanyInfo(
        companyId,
        userId,
        companyName,
        address,
        phoneNumber
      );

      return res
        .status(200)
        .json({ message: '업체 정보 수정이 완료되었습니다.', data: updatedData });
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message });
    }
  };

  // 회사 정보 삭제
  deleteCompany = async (req, res) => {
    const { companyId } = req.params;
    const { sureDelete } = req.body;
    try {
      await this.companyService.deleteCompany(companyId, sureDelete);

      return res.status(200).json({ message: '업체 정보 삭제가 완료되었습니다.' });
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = CompanyController;
