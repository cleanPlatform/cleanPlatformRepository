const express = require('express');
const router = express.Router();

const ReservationController = require('../1controllers/reservation.controller');
const reservationController = new ReservationController();

// const authMiddleware = require('../middlewares/');

router.post('/companies/:companyId/reservations', reservationController.createReservation);
router.get('/companies/:companyId/reservations', reservationController.getReservation);
// 예약 수정 :고객 본인만 변경 가능
router.put(
  '/companies/:companyId/reservations/:reservationId',
  reservationController.editReservation
);
// 예약 상태 변경 : id가 고객/사장이냐에 따라서 달라짐
// router.patch(
//   '/companies/:companyId/reservations/:reservationId',
//   reservationController.cancelReservation
// );
router.delete(
  '/companies/:companyId/reservations/:reservationId',
  reservationController.cancelReservation
);

// router.get('/me/reservations', reservationController.referAllReservation);

module.exports = router;
