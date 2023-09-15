const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ApiError = require('../utils/apierror');

const permissionCache = require('../cache/permissionCache');
const UserRepository = require('../3repositories/user.repository');
const { bearer, makeAccessToken } = require('../middlewares/auth-middleware');

class LoginService {
  userRepository = new UserRepository();
  //  로그인 핸들러
  login = async (email, password) => {
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

    // 엑세스 토큰생성
    let accessToken = makeAccessToken(isExistUser);

    permissionCache.setPermissionCache(isExistUser.userId);

    // 리프래시 토큰생성
    let RefreshToken = jwt.sign({}, process.env.COOKIE_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRE_TIME2,
    });

    accessToken = bearer(accessToken);
    RefreshToken = bearer(RefreshToken);

    return { accessToken, RefreshToken };
  };

  logout = async (userId) => {
    await permissionCache.clearCache(userId);
  };
}

module.exports = LoginService;
