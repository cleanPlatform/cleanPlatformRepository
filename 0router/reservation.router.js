const express = require('express');
const router = express.Router();
const { authorized, hasMinimumPermission } = require('../middlewares/auth-middleware');

const ReservationController = require('../1controllers/reservation.controller');
const reservationController = new ReservationController();

// 예약 등록
router.post(
  '/',
  //   authorized,
  reservationController.createReservation
);

// 업체 예약 조회
router.get('/:companyId/reservations', reservationController.getCompanyReservations);

// 예약 수정
router.put(
  '/:companyId/reservations/:reservationId',
  authorized,
  reservationController.editReservation
);

// soft delete를 해서 취소 요청에 대한 기록도 남기는 것이 좋을 것인가?
router.delete(
  '/:companyId/reservations/:reservationId',
  authorized,
  reservationController.cancelReservation
);

// router.get('/me/reservations', reservationController.referAllReservation);

module.exports = router;
