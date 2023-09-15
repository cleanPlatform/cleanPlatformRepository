const ApiError = require('../utils/apierror');

// 이메일 검증
exports.verificationEmail = (email) => {
  const emailReg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  if (!emailReg.test(email)) {
    throw new ApiError(412, '이메일 형식을 확인해주세요');
  }
};

// 비밀번호 검증
exports.verificationPassword = (pass, confirm) => {
  const passwordReg = /^(?!.*(.)\1\1)[a-zA-Z0-9!@#$%^&*]{4,}$/;
  if (!passwordReg.test(pass)) {
    throw new ApiError(
      412,
      '비밀번호는 네자리 이상, 영어 소문자(a~z), 영어 대문자(A~Z), 일부 특수문자(! @ # $ % ^  & *) 만 사용가능합니다.'
    );
  }

  if (pass !== confirm) {
    throw new ApiError(412, '패스워드가 일치하지 않습니다.');
  }
};

// 전화번호 검증
exports.verificationPhoneNumber = (number) => {
  const phoneNumberReg = /^\d{2,}-\d{3,}-\d{4,}$/;
  if (!phoneNumberReg.test(number)) {
    throw new ApiError(412, '전화번호 형식을 확인해주세요');
  }
};
