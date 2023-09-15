const CompanyService = require('../2services/company.service');
const ApiError = require('../utils/apierror');

class CompanyController {
  companyService = new CompanyService();

  // 회사 등록
  createCompany = async (req, res) => {
    const { companyName, address, phoneNumber } = req.body;
    const userId = res.locals.userId;
    try {
      const addCompanyData = await this.companyService.addCompany(
        userId,
        companyName,
        address,
        phoneNumber
      );

      return res.status(200).json({ data: addCompanyData, message: '업체 등록이 완료되었습니다.' });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 회사 정보 조회
  getCompanyInfo = async (req, res) => {
    try {
      const companyInfoAll = await this.companyService.findCompanyAll();
      return res.status(200).json({ data: companyInfoAll });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 나의 회사 조회
  getMyCompany = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const getAllCompanyService = await this.companyService.getMyCompany(userId);

      return res.status(200).json({ data: getAllCompanyService });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 회사 정보 수정
  updateCompanyInfo = async (req, res) => {
    const { companyId } = req.params;
    const { userId } = res.locals.userId;
    const { companyName, address, phoneNumber } = req.body;

    console.log(companyId, userId, companyName, address, phoneNumber);

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
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 회사 정보 삭제
  deleteCompany = async (req, res) => {
    const { companyId } = req.params;
    const { sureDelete } = req.body;
    try {
      await this.companyService.deleteCompany(companyId, sureDelete);

      return res.status(200).json({ message: '업체 정보 삭제가 완료되었습니다.' });
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

module.exports = CompanyController;
