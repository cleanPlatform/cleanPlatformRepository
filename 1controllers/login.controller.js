const ApiError = require('../utils/apierror');
const LoginService = require('../2services/login.service');

class LoginController {
  loginService = new LoginService();

  //  로그인 핸들러
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await this.loginService.login(email, password);
      res.cookie('Authorization', token.token);
      res.cookie('permission', token.permission);
      res.status(200).json({ message: `로그인에 성공했습니다.` });
    } catch (err) {
      console.log('컨트롤러 err :', err);
      if (err instanceof ApiError) {
        return res
          .status(409)
          .json({ message: '로그인에 실패했습니다. 메일과 비밀번호를 확인해주세요.' });
      }
      return res
        .status(409)
        .json({ message: '로그인에 실패했습니다. 메일과 비밀번호를 확인해주세요.' });
    }
  };

  //  로그아웃 핸들러
  logout = async (req, res) => {
    const userId = res.locals.userId;
    try {
      await this.loginService.logout(userId);

      res.removeHeader('Authorization');

      return res.status(200).json({ message: '로그아웃에 성공하였습니다.' });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);
        return res.status(err.status).json({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };
}

module.exports = LoginController;
