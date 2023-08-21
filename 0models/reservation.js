const Sequelize = require('sequelize');

class Reservation extends Sequelize.Model {
  static initiate(sequelize) {
    Reservation.init(
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
        tableName: 'reservations',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  // static associate(db) {
  //   db.Board.belongsTo(db.User, {
  //     foreignKey: 'ownerId',
  //     targetKey: 'userId',
  //   });
  //   db.Board.hasMany(db.BoardGroup, {
  //     foreignKey: 'boardId',
  //     sourceKey: 'boardId',
  //   });
  //   db.Board.hasMany(db.Column, {
  //     foreignKey: 'boardId',
  //     sourceKey: 'boardId',
  //   });
  // }
}

module.exports = Reservation;
