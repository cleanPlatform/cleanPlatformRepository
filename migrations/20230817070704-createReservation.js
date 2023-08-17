'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservation', {
      reservationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      offerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Offer',
        //   key: 'offerId',
        // },
        // onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'User',
        //   key: 'userId',
        // },
        // onDelete: 'CASCADE',
      },
      memo: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reason: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      beginDate: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('Reservation');
  },
};
