// const jwt = require('jsonwebtoken');
// const { User } = require('../models');

// // 사용자 인증 미들웨어
// module.exports = async (req, res, next) => {
//   const {Authorization} = req.cookies;
//   const [authType, authToken] = (Authorization ?? '').split(' ');

//   if (!authToken || authType !== 'Bearer') {
//     res.status(403).send({
//       errorMessage: '로그인이 필요한 기능입니다.',
//     });
//     return;
//   }

//   try {
//     const {userId} = jwt.verify(authToken, process.env.COOKIE_SECRET);
//     const user = await User.findOne({where: {userId}});
//     if (!user) {
//       res.clearCookie('Authorization');
//       return res.status(401).json({errorMessage: '토큰 사용자가 존재하지 않습니다.'});
//     }
//     res.locals.user = user;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.clearCookie('Authorization');
//     res.status(403).send({
//       errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.',
//     });
//   }
// };

const jwt = require('jsonwebtoken');
const permissionCache = require('../cache/permissionCache');

// exports.authorized = async (req, res, next) => {
//   const { authorization } = req.headers;

//   console.log('authorization :', authorization);

//   if (!authorization) {
//     return res.status(403).json({ errorMessage: '권한이 존재하지 않습니다.' });
//   }
//   const [authType, authToken] = (authorization ?? '').split(' ');
//   // console.log('authType :', authType);
//   // console.log('authToken :', authToken);

//   if (authType !== 'Bearer' || !authToken) {
//     return res.status(403).json({ errorMessage: '로그인이 필요한 기능입니다' });
//   }

//   try {
//     const { userId, email } = jwt.verify(authToken, process.env.COOKIE_SECRET);
//     res.locals.userId = userId;
//     res.locals.email = email;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
//   }
// };

exports.authorized = async (req, res, next) => {
  const authToken = req.cookies.Authorization;
  const authType = authToken.split(' ')[0];
  const token = authToken.split(' ')[1];

  if (!authToken) {
    return res.status(403).json({ errorMessage: '권한이 존재하지 않습니다.' });
  }

  if (authType !== 'Bearer') {
    return res.status(403).json({ errorMessage: '로그인 토큰이 잘못되었습니다.' });
  }

  try {
    const { userId, email } = jwt.verify(token, process.env.COOKIE_SECRET);
    res.locals.userId = userId;
    res.locals.email = email;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
  }
};

// exports.isLoggedIn = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     res.locals.isLoggedIn = false;
//     next();
//     return;
//   }

//   const [authType, authToken] = (authorization ?? '').split(' ');

//   if (!authorization || authType !== 'Bearer' || !authToken) {
//     res.locals.isLoggedIn = false;
//     next();
//     return;
//   }

//   try {
//     const { user } = jwt.verify(authToken, process.env.COOKIE_SECRET);

//     res.locals.isLoggedIn = true;
//     res.locals.userId = user.userId;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.locals.isLoggedIn = false;
//     next();
//   }
// };

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
