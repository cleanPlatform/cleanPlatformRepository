const jwt = require('jsonwebtoken');
const permissionCache = require('../cache/permissionCache');

exports.authorized = async (req, res, next) => {
  const authToken = req.cookies.Authorization;

  if (!authToken) {
    return res.status(403).json({ errorMessage: '권한이 존재하지 않습니다.' });
  }

  const authType = authToken.split(' ')[0];
  const token = authToken.split(' ')[1];

  if (authType !== 'Bearer') {
    return res.status(403).json({ errorMessage: '로그인 토큰이 잘못되었습니다.' });
  }

  try {
    const decode = this.decode(req, token, process.env.COOKIE_SECRET, res);

    res.locals.userId = decode.userId;
    res.locals.email = decode.email;
    res.locals.permission = decode.permission;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('jwt 유효기간 만료');
    } else {
      console.log(error);
      res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
    }
  }
};

exports.hasMinimumPermission = (permission) => {
  return async (req, res, next) => {
    const userId = res.locals.userId;
    try {
      if (isNaN(userId) || userId < 1) {
        return res.status(400).json({ sucess: false, message: '허가된 유저만 사용가능합니다.' });
      }

      const userPermission = permissionCache.getPermissionCache(userId);

      if (!userPermission) {
        return res.status(400).json({ sucess: false, message: '허가된 유저만 사용가능합니다.' });
      }

      const grade = {
        admin: 3,
        owner: 2,
        guest: 1,
      };
      console.log('!!!!!!!!!!!!!!!!!!!!');
      if (grade[userPermission] >= grade[permission]) {
        return next();
      }

      return res.status(400).json({ message: '허가된 유저만 사용가능합니다.' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
    }
  };
};

exports.isLogin = (req, res, next) => {
  const authToken = req.cookies.Authorization;

  if (!authToken) {
    res.locals.look = 0;
    return next();
  }

  const authType = authToken.split(' ')[0];
  const token = authToken.split(' ')[1];

  if (authType !== 'Bearer') {
    return res.status(403).json({ errorMessage: '로그인 토큰이 잘못되었습니다.' });
  }

  const decode = this.decode(req, token, process.env.COOKIE_SECRET, res);

  if (!decode) {
    return res.status(403).json({ errorMessage: '로그인 오류!' });
  }

  const permission = decode.permission;

  if (permission === 'guest') {
    res.locals.look = 1;
  } else if (permission === 'owner') {
    res.locals.look = 2;
  } else if (permission === 'admin') {
    res.locals.look = 3;
  } else {
    res.locals.look = 0;
  }

  next();
};

exports.decode = (req, token, cookie_secret, res) => {
  try {
    const decode = jwt.verify(token, cookie_secret);
    return decode;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('엑세스 토큰이 만료되었습니다.');

      const refreshToken = req.cookies.refresh;
      console.log(refreshToken);
      const reToken = refreshToken.split(' ')[1];

      try {
        jwt.verify(reToken, cookie_secret);
        const decode = jwt.decode(token, cookie_secret);
        console.log('리프레시 토큰 검증 성공');

        // 엑세스 토큰생성
        let accessToken = this.makeAccessToken(decode);

        permissionCache.setPermissionCache(decode.userId);

        accessToken = this.bearer(accessToken);

        res.cookie('Authorization', accessToken, { httpOnly: true, sameSite: 'strict' });

        return accessToken;
      } catch (error) {
        const decode = jwt.decode(token, cookie_secret);
        permissionCache.clearCache(decode.userId);
        res.clearCookie('Authorization');
        res.clearCookie('SignIn');
        res.clearCookie('refresh');
        console.error('리프레시 토큰 검증 오류:', error);
      }
    } else {
      console.error('토큰 검증 오류:', err);
    }
  }
};

exports.bearer = (token) => {
  const TYPE = 'Bearer';
  token = TYPE + ' ' + token;
  return token;
};

exports.makeAccessToken = (info) => {
  let accessToken = jwt.sign(
    {
      email: info.email,
      userId: info.userId,
      permission: info.permission,
    },
    process.env.COOKIE_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
  return accessToken;
};
