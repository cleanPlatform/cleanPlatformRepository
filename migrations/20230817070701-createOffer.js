'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Offer', {
      offerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Company',
        //   key: 'companyId',
        // },
        // onDelete: 'CASCADE',
      },
      offerNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      offerName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      price: {
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
    await queryInterface.dropTable('Offer');
  },
};
