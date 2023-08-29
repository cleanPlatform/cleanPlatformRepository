const UserService = require('../2services/user.service');
const ApiError = require('../utils/apierror');

class UsersController {
  userService = new UserService();
  // 회원가입 API
  signupController = async (req, res) => {
    console.log('회원가입 매서드 시작');
    try {
      const { permission, name, nickname, email, password, passwordConfirm, address, phoneNumber } =
        req.body;

      await this.userService.signupService(
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

  //회원 정보 조회 API
  referUserController = async (req, res) => {
    try {
      const { authorization } = req.headers;
      const { password } = req.body;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
      }

      const token = authorization.replace('Bearer ', '');

      const user = await this.userService.referUserService(token, password);

      const userInfo = user.userWithoutPassword;

      // console.log('컨트롤러 user :\n', user);

      if (user instanceof ApiError) {
        return res.status(user.status).json({ message: user.message });
      }

      return res.status(200).json({ message: user.message, userInfo });
    } catch (err) {
      console.log('컨트롤러 캐치 err :', err);
      return res.status(500).json({ message: err.message || err.toString() });
    }
  };

  //회원 정보 수정 API
  updateUserController = async (req, res) => {
    try {
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
      }

      const token = authorization.replace('Bearer ', '');

      await this.userService.updateUserService(token, req.body);

      return res.status(200).json({ message: '프로필을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //  회원 탈퇴 매서드
  deleteAccountController = async (req, res) => {
    try {
      // const {password} = req.body
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
      }

      const token = authorization.replace('Bearer ', '');

      await this.userService.deleteAccountService(token, req.body);

      return res.status(200).json({ message: '회원 탈퇴 완료하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = UsersController;
