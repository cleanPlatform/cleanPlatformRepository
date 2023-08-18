const UserService = require('../2services/user.service');

class UsersController {
  userService = new UserService();
  // 회원가입 API
  signup = async (req, res) => {
    try {
      const { userId, password, passwordConfirm, nickname, email, address, phoneNumber } = req.body;

      if (!loginId || !password || !nickname) {
        return res.status(412).json({ message: '입력되지 않은 정보가 있습니다.' });
      }
      if (password !== passwordConfirm) {
        return res.status(412).json({ message: '패스워드가 일치하지 않습니다.' });
      }

      await this.userService.signup(
        userId,
        password,
        passwordConfirm,
        nickname,
        email,
        address,
        phoneNumber
      );

      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (err) {
      console.log(error);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  // 로그인 API
  //   loginUser = async (req, res) => {
  //     try {
  //       const { loginId, password } = req.body;

  //       if (!loginId || !password) {
  //         return res.status(412).json({ message: '입력되지 않은 정보가 있습니다.' });
  //       }

  //       const { loginToken } = await this.userService.loginUser(loginId, password);

  //       res.cookie('Authorization', `Bearer ${loginToken}`);
  //       return res.status(200).json({ message: '로그인에 성공하였습니다.', loginToken });
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(err.status || 500).json({ message: err.message });
  //     }
  //   };
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
  updateUser = async (req, res) => {
    try {
      const { userId, password } = res.locals.user;
      const { existPassword, newPassword, newPasswordConfirm, nickname } = req.body;

      if (newPassword !== newPasswordConfirm) {
        return res.status(412).json({ message: '새로운 비밀번호가 일치하지 않습니다.' });
      }

      await this.userService.updateUser(userId, password, existPassword, newPassword, nickname);

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
