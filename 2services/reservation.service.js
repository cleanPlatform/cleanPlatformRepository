const ReservationRepository = require('../3repositories/reservation.repository');
const ApiError = require('../utils/apierror');

class ReservationService {
  reservationRepository = new ReservationRepository();

  // date에 대하여 조금 더 구체적으로 프로그램 짜기
  createReservation = async (userId, offerId, companyId, date, extraRequests) => {
    if (!userId || !offerId || !companyId) {
        throw new ApiError(400, "잘못된 형식의 데이터입니다.");
    }
    // 날짜 바꾸는 부분도 어떻게 바꿀지 잘 생각하기
    if (!(date instanceof Date)) {
        console.log(`before: ${date}`);
        date = Date(date);
        console.log(`after: ${date}`);
    }
    console.log(userId, offerId, companyId, date, extraRequests)
    const result = await this.reservationRepository.createReservation(
      userId,
      offerId,
      companyId,
      date,
      extraRequests
    );

    if (!result) {
      throw new ApiError(404, '예약 실패');
    }

    return result;
  };

  // 사용자 예약 정보 조회
  getUserReservations = async (userId, permission) => {
    if (isNaN(userId)) {
      throw new ApiError(400, '잘못된 형식의 데이터입니다.');
    }

    const result = await this.reservationRepository.getUserReservations(userId);
    if (result.length <= 0) {
      throw new ApiError(204, '예약 내역이 없습니다.');
    }

    return result;
  };

  // 회사 예약 일정 조회
  getCompanyReservations = async (companyId) => {
    if (isNaN(companyId)) {
      throw new ApiError(400, '잘못된 형식의 데이터입니다.');
    }

    const result = await this.reservationRepository.getCompanyReservations(companyId);
    if (result.length <= 0) {
      throw new ApiError(204, '예약 내역이 없습니다.');
    }

    return result;
  };

//   editReservation = async (userId, reservationId, offerId, date, extraRequests, permission) => {
//     const existReservation = await this.reservationRepository.getReservation(reservationId);
//     if (!existReservation) {
//       throw new ApiError(404, '예약 내역이 확인되지 않습니다.');
//     }
//     if (existReservation.userId !== userId) {
//       // 권한에 대한 함수 디자인 하기. 사용자 본인 혹은 업체 사람/관리자
//       throw new ApiError(403, '수정 권한이 없습니다.');
//     }

//     const result = await this.reservationRepository.editReservation(
//       reservationId,
//       offerId,
//       date,
//       extraRequests
//     );
//     if (!result) {
//       throw new ApiError(400, '예약 업데이트에 실패하였습니다.');
//     }

//     return result;
//   };

//   cancelReservation = async (userId, reservationId, cancelReason, permission) => {
//     if (isNaN(userId) || !userId || isNaN(reservationId)) {
//       throw new ApiError(404, '잘못된 접근입니다.');
//     }

//     const existReservation = await this.reservationRepository.getReservation(reservationId);
//     if (!existReservation) {
//       throw new ApiError(404, '존재하지 않는 댓글입니다');
//     }
//     if (existReservation.userId !== userId) {
//       // 권한에 대한 함수 디자인 하기. 사용자 본인 혹은 업체 사람/관리자
//       throw new ApiError(403, '삭제 권한이 없습니다.');
//     }

//     const result = await this.reservationRepository.cancelReservation(reservationId, cancelReason);

//     if (!result) {
//       throw new ApiError(400, '예약 취소에 실패하였습니다.');
//     }

//     return result;
//   };
}

module.exports = ReservationService;
