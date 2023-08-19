const { User } = require('../0models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserRepository {
  // loginId로 회원 조회
  findUser = async (email) => {
    return await User.findOne({ where: { email } });
  };
  // 회원가입 API
  signup_repository = async (permission, name, nickname, email, password, address, phoneNumber) => {
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

  login_repository = async (email, password) => {
    try {
    } catch (err) {}
  };

  //회원 정보 수정 API
  updateUser = async (email, name, nickname, hashPassword, address, phoneNumber) => {
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
  deleteUser = async (userId) => {
    await User.destroy({ where: { UserId: userId } });
  };
}

module.exports = UserRepository;
