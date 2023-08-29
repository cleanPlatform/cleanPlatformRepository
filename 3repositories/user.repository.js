const { User } = require('../0models');

class UserRepository {
  // loginId로 회원 조회
  findUser = async (email) => {
    return await User.findOne({ where: { email } });
  };

  // userId로 조회
  findUserOne = async (userId) => {
    return await User.findOne({ where: { userId } });
  };

  // 회원가입 API
  signupRepository = async (permission, name, nickname, email, password, address, phoneNumber) => {
    const result = await User.create({
      permission,
      name,
      nickname,
      email,
      password,
      address,
      phoneNumber,
    });

    return result;
  };

  loginRepository = async (email, password) => {
    try {
    } catch (err) {}
  };

  //회원 정보 수정 API
  updateUserRepository = async (email, name, nickname, hashPassword, address, phoneNumber) => {
    await User.update(
      {
        name: name,
        nickname: nickname,
        password: hashPassword,
        address: address,
        phoneNumber: phoneNumber,
      },
      { where: { email } }
    );
  };

  //회원 탈퇴 API
  deleteAccountService = async (email) => {
    await User.destroy({ where: { email: email } });
  };
}

module.exports = UserRepository;
