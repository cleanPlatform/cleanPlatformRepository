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
      const { userId } = res.locals;

      const referUser = await this.userService.referUserService(userId);

      const user = referUser.user;

      if (user instanceof ApiError) {
        return res.status(user.status).json({ message: referUser.message });
      }

      return res.status(200).json({ message: referUser.message, user });
    } catch (err) {
      console.log('컨트롤러 캐치 err :', err);
      return res.status(500).json({ message: err.message || err.toString() });
    }
  };

  //회원 정보 수정 API
  updateUserController = async (req, res) => {
    try {
      await this.userService.updateUserService(req.body);

      return res.status(200).json({ message: '프로필을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //  회원 탈퇴 핸들러
  deleteAccoountController = async (req, res) => {
    try {
      const { userId } = res.locals;
      const { password } = req.body;

      await this.userService.deleteAccountService(userId, password);
      res.clearCookie('Authorization');
      res.clearCookie('SignIn');
      res.clearCookie('refresh');

      return res.status(200).json({ message: '회원 탈퇴 완료하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = UsersController;
