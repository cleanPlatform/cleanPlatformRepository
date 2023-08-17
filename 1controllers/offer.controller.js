const OfferRepository = require('../3repositories/offer.repository');
const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class OfferService {
  offerRepository = new OfferRepository();
}

module.exports = OfferService;
