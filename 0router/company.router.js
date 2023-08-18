const express = require('express');
const router = express.Router();

const CompanyController = require('../1controllers/company.controller');
const companyController = new CompanyController();

const authMiddleware = require('../middlewares/auth-middleware');

// 회사 등록
router.post('/companies', companyController.createCompany);

// 회사 정보 조회
router.get('/companies', companyController.getCompanyInfo);

// 회사 정보 수정, 회사 및 관리자 전용
router.put('/companies/:companyId', companyController.updateCompanyInfo);

// 회사 정보 삭제, 회사 및 관리자 전용
router.delete('/companies/:companyId', companyController.deleteCompany);

module.exports = router;
