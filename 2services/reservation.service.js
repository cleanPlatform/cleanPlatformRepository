const ReservationRepository = require('../3repositories/reservation.repository');
const ApiError = require('../utils/apierror');
const permissionCache = require('../cache/permissionCache');
const permissionGrade = require('../utils/permissionGrade');

class ReservationService {
  reservationRepository = new ReservationRepository();

  // date에 대하여 조금 더 구체적으로 프로그램 짜기
  createReservation = async (userId, offerId, date, extraRequests) => {
    if (!userId || !offerId || isNaN(userId) || isNaN(offerId)) {
      throw new ApiError(400, '잘못된 형식의 데이터입니다.');
    }

    date = new Date(date);
    if (!(date instanceof Date)) {
      throw new ApiError(400, '잘못된 형식의 데이터입니다.');
    }

    const result = await this.reservationRepository.createReservation(
      userId,
      offerId,
      date,
      extraRequests
    );

    if (!result) {
      throw new ApiError(404, '예약 실패');
    }

    return result;
  };

  // 사용자 예약 정보 조회
  getUserReservations = async (userId) => {
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
  getCompanyReservations = async (offerId, year, month) => {
    const isNotValidNumber = isNaN(offerId) || isNaN(year) || isNaN(month);
    const isNotInValidRange = Number(year) < 0 || Number(month) > 12 || Number(month) < 1;
    if (isNotValidNumber || isNotInValidRange) {
      throw new ApiError(400, '잘못된 형식의 데이터입니다.');
    }

    // Date 객체에서 월은 0부터 시작
    const beginningDateOfMonth = new Date(year, month - 1, 1);
    const endDateOfMonth = new Date(year, month, 0);
    const beginningDateOfNextMonth = new Date(year, month, 1);

    const result = await this.reservationRepository.getCompanyReservations(
      offerId,
      beginningDateOfMonth,
      beginningDateOfNextMonth
    );
    if (result.length <= 0) {
      throw new ApiError(204, '예약 내역이 없습니다.');
    }

    // result에 나온 결과에서 날짜별로 처리
    for (let i = 1; i < endDateOfMonth.getDate(); i++) {}

    return result;
  };

  // 예약 수정
  editReservation = async (userId, reservationId, offerId, date, extraRequests) => {
    const existReservation = await this.reservationRepository.getReservation(reservationId);
    if (!existReservation) {
      throw new ApiError(404, '예약 내역이 확인되지 않습니다.');
    }

    const isAuthor = existReservation.userId === userId;
    const isAdmin = permissionCache.getPermissionCache(userId);
    if (!isAuthor || !isAdmin) {
      // 권한에 대한 함수 디자인 하기. 사용자 본인 혹은 업체 사람/관리자
      throw new ApiError(403, '수정 권한이 없습니다.');
    }

    const result = await this.reservationRepository.editReservation(
      reservationId,
      offerId,
      date,
      extraRequests
    );
    if (!result) {
      throw new ApiError(400, '예약 업데이트에 실패하였습니다.');
    }

    return result;
  };

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
