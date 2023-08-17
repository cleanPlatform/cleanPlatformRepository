const { User } = require('../0models');

class UserRepository {
  // loginId로 회원 조회
  findUser = async (loginId) => {
    return await User.findOne({ where: { loginId } });
  };
  // 회원가입 API
  createUser = async (
    roleId,
    loginId,
    hashPassword,
    nickname,
    name,
    email,
    address,
    phoneNumber
  ) => {
    await User.create({
      roleId,
      loginId,
      password: hashPassword,
      nickname,
      name,
      email,
      address,
      phoneNumber,
    });
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
