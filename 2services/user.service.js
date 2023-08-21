const UserRepository = require('../3repositories/user.repository');
const ApiError = require('../utils/apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const util = require('util');
const permissionCache = require("../cache/permissionCache");

const UserENUM = ['admin', 'owner', 'guest'];

class UserService {
  userRepository = new UserRepository();
  //  회원가입 매서드
  signup_service = async (
    permission,
    name,
    nickname,
    email,
    password,
    passwordConfirm,
    address,
    phoneNumber
  ) => {
    if (!email || !password || !nickname) {
      throw new ApiError(412, '입력되지 않은 정보가 있습니다.');
    }

    //비밀번호 검증
    const passwordReg = /^.{4,}$/;
    if (password) {
      if (!passwordReg.test(password)) {
        throw new ApiError(412, '비밀번호는 네자리 이상으로 해주세요');
      }
    }

    if (password !== passwordConfirm) {
      throw new ApiError(412, '패스워드가 일치하지 않습니다.');
    }

    if (!UserENUM.includes(permission)) {
      throw new ApiError(412, `permission의 값이 유효하지 않습니다.`);
    }

    const isExistUser = await this.userRepository.findUser(email);
    if (isExistUser) {
      throw new ApiError(409, '중복된 이메일 입니다.');
    }

    //암호화
    password = await bcrypt.hash(password, 6);

    const result = await this.userRepository.signup_repository(
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
    try {
      // 존재하는 이메일인지 확인하기
      const isExistUser = await this.userRepository.findUser(email);
      if (!isExistUser) {
        throw new ApiError(409, '존재하지 않는 이메일 입니다.');
      }

      // 비밀번호 일치 확인
      const isValidPassword = await bcrypt.compare(password, isExistUser.password);
      if (isValidPassword !== true) {
        const errorMessage = '비밀번호가 일치하지 않습니다.';
        throw new ApiError(409, errorMessage);
      }

      // console.log('isExistUser :', isExistUser);
      // console.log('isValidPassword :', isValidPassword);

      // 토큰생성
      const token = jwt.sign({ email: isExistUser.email }, process.env.COOKIE_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      });
      permissionCache.setPermissionCache(userId);

      return token;
    } catch (err) {
      console.log(err);
      // return res.status(err.status).json({ message: err.message });
      return res.status(401).json({ message: '로그인에 실패했습니다.' });
      // return { status: err.status, message: err.message };
    }
  };

  //  회원 정보 조회 매서드
  referUser_service = async (token, password) => {
    try {
      const decodedToken = await util.promisify(jwt.verify)(token, process.env.COOKIE_SECRET);
      const { email } = decodedToken;

      const user = await this.userRepository.findUser(email);
      if (!user) {
        throw new ApiError('존재하지 않는 로그인 이메일입니다.', 401);
      }

      const passwordMatch1 = await bcrypt.compare(password, user.password);
      if (!passwordMatch1) {
        throw new Error('비밀번호가 일치하지 않습니다.');
        // throw new ApiError('비밀번호가 일치하지 않습니다.', 412);
      }

      const message = '조회에 성공하였습니다.';

      const userWithoutPassword = { ...user.dataValues };
      delete userWithoutPassword.password;

      // console.log(user);

      return { message, userWithoutPassword };
    } catch (err) {
      console.log('서비스 err :', err);
      throw new Error(err);
    }
  };

  //  회원 정보 수정 매서드
  updateUser_service = async (token, updateData) => {
    try {
      const decodedToken = await util.promisify(jwt.verify)(token, process.env.COOKIE_SECRET);
      const { email } = decodedToken;

      const {
        name,
        nickname,
        existPassword,
        newPassword,
        newPasswordConfirm,
        address,
        phoneNumber,
      } = updateData;

      const user = await this.userRepository.findUser(email);
      if (!user) {
        throw new ApiError('존재하지 않는 로그인 이메일입니다.', 401);
      }

      const passwordMatch1 = await bcrypt.compare(existPassword, user.password);
      if (!passwordMatch1) {
        throw new ApiError('기존 비밀번호가 일치하지 않습니다.', 412);
      }

      if (newPassword !== newPasswordConfirm) {
        throw new ApiError('새로운 비밀번호를 똑같이 두 번 입력해주세요.', 412);
      }

      const passwordReg = /^.{4,}$/;
      if (newPassword) {
        if (!passwordReg.test(newPassword)) {
          throw new ApiError('비밀번호는 네자리 이상으로 해주세요', 412);
        }
      }

      let hashPassword;
      if (newPassword) {
        hashPassword = await bcrypt.hash(newPassword, 6);
      } else {
        hashPassword = user.password;
      }

      // const hashPassword = await bcrypt.hash(newPassword, 6);

      let updateDater = {};

      const daterForUpdate = ['name', 'nickname', 'address', 'phoneNumber'];

      for (const element of daterForUpdate) {
        updateDater[element] = updateData[element] || user[element];
      }

      await this.userRepository.updateUser(
        email,
        name,
        nickname,
        hashPassword,
        address,
        phoneNumber
      );
    } catch (err) {
      throw err;
    }
  };

  //  회원 탈퇴 API
  resignUser_service = async (token, deleteData) => {
    try {
      const { password } = deleteData;

      const decodedToken = await util.promisify(jwt.verify)(token, process.env.COOKIE_SECRET);
      const { email } = decodedToken;

      const user = await this.userRepository.findUser(email);
      if (!user) {
        throw new ApiError('존재하지 않는 로그인 이메일입니다.', 401);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      await this.userRepository.resignUser_service(email);
    } catch (err) {
      console.log('서비스 err :', err);
      throw new Error(err);
    }
  };
}

module.exports = UserService;
