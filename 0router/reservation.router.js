const express = require('express');
const router = express.Router();
const { authorized, hasMinimumPermission } = require('../middlewares/auth-middleware');

const ReservationController = require('../1controllers/reservation.controller');
const reservationController = new ReservationController();

// 예약 등록
router.post(
  '/:companyId/reservations',
  authorized,
  reservationController.createReservation
);

// 예약 조회
router.get('/:companyId/reservations', reservationController.getCompanyReservations);
// 예약 수정 :고객 본인만 변경 가능
router.put(
  '/:companyId/reservations/:reservationId',
  authorized,
  reservationController.editReservation
);
// 예약 상태 변경 : id가 고객/사장이냐에 따라서 달라짐
// router.patch(
//   '/companies/:companyId/reservations/:reservationId',
//   reservationController.cancelReservation
// );
router.delete(
  '/:companyId/reservations/:reservationId',
  authorized,
  reservationController.cancelReservation
);

// router.get('/me/reservations', reservationController.referAllReservation);

module.exports = router;
