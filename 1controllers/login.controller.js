const ApiError = require('../utils/apierror');
const LoginService = require('../2services/login.service');

class LoginController {
  loginService = new LoginService();

  //  로그인 핸들러
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await this.loginService.login(email, password);

      res.cookie('Authorization', token.accessToken, {
        httpOnly: true,
        sameSite: 'strict',
      });

      res.cookie('refresh', token.RefreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      });

      return res.status(201).json({ message: `로그인에 성공했습니다.` });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  //  로그아웃 핸들러
  logout = async (req, res) => {
    const userId = res.locals.userId;
    try {
      const result = await this.loginService.logout(userId);
      res.clearCookie('Authorization');
      res.clearCookie('SignIn');
      res.clearCookie('refresh');

      return res.status(201).json({ message: '로그아웃에 성공하였습니다.' });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);

        return res.status(err.status).json({ message: err.message });
      }
      console.error(err);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = LoginController;
