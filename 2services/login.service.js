const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const permissionCache = require('../cache/permissionCache');
const UserRepository = require('../3repositories/user.repository');

class LoginService {
  userRepository = new UserRepository();
  //  로그인 핸들러
  login = async (email, password) => {
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
    } catch (err) {
      console.log(err);
      // return res.status(err.status).json({ message: err.message });
      throw new Error(err);
      // return { status: err.status, message: err.message };
    }
  };

  logout = async (userId) => {
    try {
      await permissionCache.clearCache(userId);
    } catch (err) {
      console.error('로그아웃 실패: ', err);
      throw err;
    }
  };
}

module.exports = LoginService;
