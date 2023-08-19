const UserService = require('../2services/user.service');
const ApiError = require('../utils/apierror');

class UsersController {
  userService = new UserService();
  // 회원가입 API
  signup_controller = async (req, res) => {
    console.log('회원가입 매서드 시작');
    try {
      const { permission, name, nickname, email, password, passwordConfirm, address, phoneNumber } =
        req.body;

      await this.userService.signup_service(
        permission,
        name,
        nickname,
        email,
        password,
        passwordConfirm,
        address,
        phoneNumber
      );

      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);
        return res.status(err.status).json({ message: err.message });
      }

      console.log('err :', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  //  로그인 매서드
  login_controller = async (req, res) => {
    console.log('로그인 매서드 시작');
    const { email, password } = req.body;
    try {
      // const existRefreshToken = req.cookies.refreshToken;
      // const { status, accesscookie, refreshcookie, message } =
      //   await this.userService.loginUser_service(email, password, existRefreshToken);

      // if (accesscookie && refreshcookie) {
      //   res.cookie(accesscookie.name, accesscookie.token, {
      //     expiresIn: accesscookie.expiresIn,
      //   });
      //   res.cookie(refreshcookie.name, refreshcookie.token, {
      //     expiresIn: refreshcookie.expiresIn,
      //   });
      // }
      // return res.status(200).json({ message });

      // const { loginToken } = await this.userService.loginUser_service(email, password);
      // // console.log('컨트롤러 res:', res);
      // res.cookie('Authorization', `Bearer ${loginToken}`);
      // return res.status(200).json({ message: '로그인에 성공했습니다.', loginToken });

      // 다른코드

      const token = await this.userService.loginUser_service(email, password);
      res.header('Authorization', `Bearer ${token}`);
      res.status(200).json({ message: '로그인에 성공했습니다.' });
    } catch (err) {
      console.log('컨트롤러 err :', err);
      if (err instanceof ApiError) {
        // console.error(err.message);
        return res
          .status(409)
          .json({ message: '로그인에 실패했습니다. 메일과 비밀번호를 확인해주세요.' });
      }
      return res
        .status(409)
        .json({ message: '로그인에 실패했습니다. 메일과 비밀번호를 확인해주세요.' });
      // return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  //회원 정보 조회 API
  getUser = async (req, res) => {
    try {
      const user = res.locals.user;
      delete user.dataValues.password;

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //회원 정보 수정 API
  updateUser_controller = async (req, res) => {
    try {
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
      }

      const token = authorization.replace('Bearer ', '');

      await this.userService.updateUser_service(token, req.body);

      return res.status(200).json({ message: '프로필을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //회원 탈퇴 API
  deleteUser = async (req, res) => {
    try {
      const { userId, password } = res.locals.user;
      const { existPassword } = req.body;

      if (!existPassword) {
        return res.status(412).json({ errorMessage: '입력되지 않은 정보가 있습니다.' });
      }

      await this.userService.deleteUser(userId, password, existPassword);

      return res.status(200).json({ message: '회원 탈퇴 완료하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = UsersController;
