const ReservationService = require('../2services/reservation.service');
const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class CompanyService {
  reservationRepository = new ReservationRepository();
}

module.exports = ReservationService;
