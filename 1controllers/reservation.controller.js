const ReservationService = require('../2services/reservation.service');
const ApiError = require('../utils/apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class ReservationController {
  reservationService = new ReservationService();

  createReservation = async (req, res, next) => {
    console.log('create reservation!!');

    return res.status(200).json({ message: '!!!' });
  };

  getReservation = async (req, res, next) => {
    console.log('get reservation!!');

    return res.status(200).json({ message: '!!!' });
  };

  editReservation = async (req, res, next) => {
    console.log('edit reservation!!');

    return res.status(200).json({ message: '!!!' });
  };

  cancelReservation = async (req, res, next) => {
    console.log('cancel reservation!!');

    return res.status(200).json({ message: '!!!' });
  };
}

module.exports = ReservationController;
