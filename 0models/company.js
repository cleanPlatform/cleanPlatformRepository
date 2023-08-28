const { Sequelize, Model } = require('sequelize');

class Company extends Sequelize.Model {
  static associate(db) {
    db.Company.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    });
    db.Company.hasMany(db.Offer, {
      foreignKey: 'companyId',
      sourceKey: 'companyId',
    });
  }

  static initiate(sequelize) {
    super.init(
      {
        companyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        companyName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Company',
        tableName: 'Company',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
}

module.exports = Company;
