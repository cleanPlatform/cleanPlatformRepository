const Sequelize = require('sequelize');

class Offer extends Sequelize.Model {
  static associate(db) {
    db.Offer.belongsTo(db.Company, {
      foreignKey: 'companyId',
      targetKey: 'companyId',
    });
    db.Offer.hasMany(db.Reservation, {
      foreignKey: 'offerId',
      sourceKey: 'offerId',
    });
  }

  static initiate(sequelize) {
    super.init(
      {
        offerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        companyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
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
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Offer',
        tableName: 'Offer',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
}

module.exports = Offer;
