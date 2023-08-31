const Sequelize = require('sequelize');

class Offer extends Sequelize.Model {
  static initiate(sequelize) {
    Offer.init(
      {
        offerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        // companyId: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        // },
        offerNumber: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        offerName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        headcount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Offer',
        tableName: 'offers',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Offer.belongsTo(db.Company, {
      foreignKey: 'companyId',
      targetKey: 'companyId',
    });
    // db.Offer.hasMany(db.Reservation, {
    //   foreignKey: 'offerId',
    //   sourceKey: 'offerId',
    // });
  }
}

module.exports = Offer;
