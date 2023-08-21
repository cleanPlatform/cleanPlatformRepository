const Sequelize = require('sequelize');

class Company extends Sequelize.Model {
  static initiate(sequelize) {
    Company.init(
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
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Company',
        tableName: 'companies',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

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
}

module.exports = Company;
