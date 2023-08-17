const express = require('express');
const router = express.Router();

const CompanyController = require('../1controllers/company.controller');
const companyController = new CompanyController();

// const authMiddleware = require('../middlewares/');

// router.post('/companies', companyController.createCompany);
// router.get('/companies', companyController.referCompany);
// router.put('/companies/:companyId', companyController.referCompany);
// router.delete('/companies/:companyId', companyController.deleteCompany);

module.exports = router;
