const UserRepository = require('../3repositories/user.repository');
const CompanyRepository = require('../3repositories/company.repository');

const ApiError = require('../utils/apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const util = require('util');

const permissionCache = require('../cache/permissionCache');
const {
  verificationPhoneNumber,
  verificationEmail,
  verificationPassword,
} = require('../middlewares/verificationReg-middleware');

const UserENUM = ['admin', 'owner', 'guest'];

class UserService {
  userRepository = new UserRepository();
  companyRepository = new CompanyRepository();

  //  회원가입 매서드
  signupService = async (
    permission,
    name,
    nickname,
    email,
    password,
    passwordConfirm,
    address,
    phoneNumber
  ) => {
    if (
      !permission ||
      !name ||
      !nickname ||
      !email ||
      !password ||
      !passwordConfirm ||
      !address ||
      !phoneNumber
    ) {
      throw new ApiError(412, '입력되지 않은 정보가 있습니다.');
    }

    // 이메일 검증
    verificationEmail(email);

    // 비밀번호 검증
    verificationPassword(password, passwordConfirm);

    // 전화번호 검증
    verificationPhoneNumber(phoneNumber);

    if (!UserENUM.includes(permission)) {
      throw new ApiError(412, `사장과 고객중 하나로만 가입할 수 있습니다.`);
    }

    const isExistUser = await this.userRepository.findUser(email);
    if (isExistUser) {
      throw new ApiError(409, '중복된 이메일 입니다.');
    }

    //암호화
    password = await bcrypt.hash(password, 6);

    const result = await this.userRepository.signupRepository(
      permission,
      name,
      nickname,
      email,
      password,
      address,
      phoneNumber
    );
    if (!result) {
      throw new ApiError(400, '계정 생성에 실패하였습니다.');
    }

    // return result;
  };

  //  로그인 매서드
  loginUser_service = async (email, password) => {
    // 존재하는 이메일인지 확인하기
    const isExistUser = await this.userRepository.findUser(email);
    if (!isExistUser) {
      throw new ApiError(409, '존재하지 않는 로그인 이메일입니다.');
    }

    // 비밀번호 일치 확인
    const isValidPassword = await bcrypt.compare(password, isExistUser.password);
    if (isValidPassword !== true) {
      throw new ApiError(409, '비밀번호가 일치하지 않습니다.');
    }

    // 토큰생성
    let token = jwt.sign(
      { email: isExistUser.email, userId: isExistUser.userId },
      process.env.COOKIE_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
    const TYPE = 'Bearer';
    token = TYPE + ' ' + token;
    permissionCache.setPermissionCache(isExistUser.userId);

    return token;
  };

  //  회원 정보 조회 매서드
  referUserService = async (userId) => {
    const user = await this.userRepository.findUserOne(userId);
    if (!user) {
      throw new ApiError(401, '존재하지 않는 로그인 이메일입니다.');
    }

    const message = '조회에 성공하였습니다.';

    return { user, message };
  };

  //  회원 정보 수정 매서드
  updateUserService = async (
    userId,
    password,
    passwordConfirm,
    name,
    nickname,
    address,
    phoneNumber
  ) => {
    const user = await this.userRepository.findUserOne(userId);
    if (!user) {
      throw new ApiError('존재하지 않는 로그인 이메일입니다.', 401);
    }

    if (password) {
      // 비밀번호 검증
      verificationPassword(password, passwordConfirm);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      throw new ApiError(412, '기존 비밀번호와 다른 비밀번호를 입력해주세요.');
    }

    const salt = parseInt(process.env.SALT);

    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, salt);
    } else {
      hashPassword = user.password;
    }

    // 전화번호 검증
    verificationPhoneNumber(phoneNumber);

    await this.userRepository.updateUserRepository(
      userId,
      hashPassword,
      name,
      nickname,
      address,
      phoneNumber
    );
  };

  //  회원 탈퇴 핸들러
  deleteAccountService = async (userId, password) => {
    try {
      const isExistUser = await this.userRepository.findUserOne(userId);
      if (!isExistUser) {
        throw new ApiError(401, '존재하지 않는 로그인 이메일입니다.');
      }

      // 비밀번호 일치 확인
      const isValidPassword = await bcrypt.compare(password, isExistUser.password);
      if (isValidPassword !== true) {
        const errorMessage = '비밀번호가 일치하지 않습니다.';
        throw new ApiError(409, errorMessage);
      }

      const haveCompany = await this.companyRepository.companyId(userId);
      console.log('haveCompany :', haveCompany);
      if (haveCompany.length !== 0) {
        throw new Error('등록된 업장이 있으면 탈퇴하실 수 없습니다.');
      } else {
        await permissionCache.clearCache(userId);
      }

      await this.userRepository.deleteAccountService(userId);
    } catch (err) {
      console.log('서비스 err :', err);
      throw new Error(err);
    }
  };
}

module.exports = UserService;
