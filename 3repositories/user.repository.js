const { User } = require('../0models');

class UserRepository {
  // loginId로 회원 조회
  findUser = async (email) => {
    return await User.findOne({ where: { email } });
  };
  // 회원가입 API
  createUser = async (email, password, nickname, name, address, phoneNumber, permission) => {
    const result = await User.create({
      email,
      password,
      nickname,
      name,
      address,
      phoneNumber,
      permission,
    });

    return result;
  };
  //회원 정보 수정 API
  updateUser = async (userId, hashPassword, nickname) => {
    const updateValues = {};
    if (hashPassword) updateValues.password = hashPassword;
    if (nickname) updateValues.nickname = nickname;

    await User.update(updateValues, { where: { userId } });
  };
  //회원 탈퇴 API
  deleteUser = async (userId) => {
    await User.destroy({ where: { UserId: userId } });
  };
}

module.exports = UserRepository;
