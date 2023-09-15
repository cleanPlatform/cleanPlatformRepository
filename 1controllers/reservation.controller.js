const ReservationService = require('../2services/reservation.service');
const ApiError = require('../utils/apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class ReservationController {
  reservationService = new ReservationService();

  createReservation = async (req, res, next) => {
    // const { offerId, date, extraRequests } = req.body;
    const { offerId, reservationDate, extraRequests } = req.body;
    // const userId = res.locals.userId;
    const userId = 10; // 임시로 작성. 후에 위에 13번째 줄의 코드로 이용해야 함

    try {
      await this.reservationService.createReservation(
        userId,
        offerId,
        reservationDate,
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
    // 추후 사용할지 안할지 결정해야 해서 주석으로 달아놓음
    // const { companyId } = req.params;
    const { offerId, year, month } = req.query;

    try {
      const result = await this.reservationService.getCompanyReservations(offerId, year, month);

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

  // 컨트롤러에서 캐쉬를 읽어서 서비스로 넘기는 것이 좋을까?
  // 아니면 서비스에서 바로 캐쉬를 읽어들이는 것이 좋을까?
  // 우선 서비스에서 캐쉬를 읽도록 구현
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
