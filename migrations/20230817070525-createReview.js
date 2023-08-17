'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Review', {
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      reservationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Reservation',
        //   key: 'reservationId',
        // },
        // onDelete: 'CASCADE',
      },
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      rate: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Review');
  },
};
