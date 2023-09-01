const { User } = require('../0models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

      await t.commit();
      return updateRepository;
    } catch (error) {
      await t.rollback();
      throw error;
    }
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

    try {
      const findOffer = await Offer.findOne({ where: { offerId: offerId } });
      await t.commit();
      return findOffer;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  login_repository = async (email, password) => {
    try {
      const destroyRepository = await Offer.destroy({
        where: { offerId },
        transaction: t,
      });

      await t.commit();
      return destroyRepository;
    } catch (error) {
      await t.rollback();
      throw error;
    }
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
  resignUser_service = async (email) => {
    await User.destroy({ where: { email: email } });
  };
}

module.exports = OfferRepository;
