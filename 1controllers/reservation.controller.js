const ReservationService = require('../2services/reservation.service');
const ApiError = require('../utils/apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class ReservationController {
  reservationService = new ReservationService();

  createReservation = async (req, res, next) => {
    const { offerId, date, extraRequests } = req.body;
    const { companyId } = req.params;
    const userId = res.locals.userId;

    // companyId가 있는지 없는지 확인하는 작업도 필요함.
    try {
      await this.reservationService.createReservation(
        userId,
        offerId,
        companyId,
        date,
        extraRequests
      );

      return res.status(201).send();
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 회사 예약 내역 확인
  getCompanyReservations = async (req, res, next) => {
    const { companyId } = req.params;

    try {
      const result = await this.reservationService.getCompanyReservations(companyId);

      return res.status(201).json({ data: result });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 사용자 예약 내역 확인
  getUserReservations = async (req, res, next) => {
    const userId = res.locals.userId;

    try {
      await this.reservationService.getReservations(userId);

      return res.status(201).send();
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  editReservation = async (req, res, next) => {
    const { offerId, date, extraRequests } = req.body;
    const { reservationId } = req.params;
    const userId = res.locals.userId;

    try {
      await this.reservationService.editReservation(
        userId,
        reservationId,
        offerId,
        date,
        extraRequests
      );

      return res.status(201).send();
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  cancelReservation = async (req, res, next) => {
    const { cancelReason } = req.body;
    const { reservationId } = req.params;
    const userId = res.locals.userId;
    const permission = res.locals.permission;

    try {
      await this.reservationService.cancelReservation(
        userId,
        reservationId,
        cancelReason,
        permission
      );

      return res.status(201).send();
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

module.exports = ReservationController;
