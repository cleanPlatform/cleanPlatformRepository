const ApiError = require('../utils/apierror');
const LoginService = require('../2services/login.service');

class LoginController {
  loginService = new LoginService();

  //  로그인 매서드
  loginController = async (req, res) => {
    console.log('로그인 매서드 시작');
    const { email, password } = req.body;

    try {
      const token = await this.loginService.loginUserService(email, password);

      res.header('Authorization', token);
      res.status(200).json({ message: '로그인에 성공했습니다.', token });
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

  //  로그아웃 메서드
  logoutController = async (req, res) => {
    console.log('로그아웃 메서드 컨트롤러 진입');

    try {
      const { sureLogout } = req.body;

      if (sureLogout === 'yes') {
        // 로그아웃시 헤더에 토큰을 제거
        // 썬더 클라이언트에서는 헤더에 값이 할당되지 않아서 수동으로해야함
        // 프론트를 만든 다음에 확인야 할 필요가 있음
        res.removeHeader('Authorization');
        return res.status(200).json({ message: '로그아웃에 성공하였습니다.' });
      } else {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
      }
    } catch (err) {
      console.log('로그아웃 컨트롤러 캐치 진입');

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
