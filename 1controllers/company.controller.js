const CompanyService = require('../2services/company.service');
const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class CompanyController {
  companyService = new CompanyService();
}

module.exports = CompanyController;
