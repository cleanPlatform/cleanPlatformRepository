const { Reservation } = require('../0models');
const { Op } = require('sequelize');

class ReservationRepository {
  createReservation = async (userId, offerId, date, extraRequests) => {
    const result = await Reservation.create({
      userId,
      offerId,
      date,
      extraRequests,
      status: 'reserved',
    });

    return result;
  };

  // 아래 두 함수를 객체에 있는 속성을 확인하게 해서 묶어버릴까...?
  getUserReservations = async (userId) => {
    const result = await Reservation.findAll({ where: { userId } });

    return result;
  };

  // date의 수와 업체에서 할당 가능한 업체의 수 사이의 관계를 어떻게 처리할지 생각하기
  // 이러한 부분은 예약을 하는 부분도 같이 고려가 되어야 함
  getCompanyReservations = async (offerId, beginningDateOfMonth, beginningDateOfNextMonth) => {
    // const result = await Reservation.findAll({ attributes: ['date'] }, { where: { companyId,  } });
    const result = await Reservation.findAll({
      attributes: ['date'],
      where: {
        offerId,
        date: {
          [Op.and]: {
            [Op.gte]: beginningDateOfMonth.toISOString(),
            [Op.lt]: beginningDateOfNextMonth.toISOString(),
          },
        },
      },
    });

    return result;
  };

  editReservation = async (reservationId, offerId, date, extraRequests) => {
    const result = await Reservation.update(
      { offerId, date, extraRequests },
      { where: { reservationId } }
    );

    return result;
  };

  //   cancelReservation = async (reservationId, cancelReason) => {
  //     const t = await sequelize.transaction({
  //       isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  //     });
  //     try {
  //       const updateResult = await Reservation.update(
  //         { cancelReason },
  //         { where: { reservationId } },
  //         { transaction: t }
  //       );

  //       if (!updateResult) {
  //         throw new Error('예약 취소에 실패하였습니다.');
  //       }

  //       const deleteResult = await Reservation.destroy(
  //         { where: { reservationId } },
  //         { transaction: t }
  //       );
  //       if (!deleteResult) {
  //         throw new Error('예약 취소에 실패하였습니다.');
  //       }

  //       // 아래 스타일로 짜는 것이 나을라나?
  //       //   if (!updateResult || !deleteResult) {
  //       //     throw new Error("예약 취소에 실패하였습니다");
  //       //   }
  //       await t.commit;

  //       return true;
  //     } catch (err) {
  //       console.error('리뷰 삭제 에러', err);
  //       await t.rollback();
  //       return false;
  //     }
  //   };
}

module.exports = ReservationRepository;
