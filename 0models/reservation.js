const Sequelize = require('sequelize');

class Reservation extends Sequelize.Model {
  static associate(db) {
    db.Reservation.belongsTo(db.User, {
      foreignKey: 'ownerId',
      targetKey: 'userId',
    });
    db.Reservation.belongsTo(db.Offer, {
      foreignKey: 'offerId',
      sourceKey: 'offerId',
    });
    // db.v.hasMany(db.Column, {
    //   foreignKey: 'boardId',
    //   sourceKey: 'boardId',
    // });
  }
  static initiate(sequelize) {
    super.init(
      {
        reservationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        offerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        companyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        extraRequests: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        cancelReason: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Reservation',
        tableName: 'Reservation',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
}

module.exports = Reservation;
