'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      permission: {
        type: Sequelize.ENUM('admin', 'owner', 'guest'),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  },
};
