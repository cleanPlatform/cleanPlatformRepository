const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
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
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING(15),
        },
        // createdAt: {
        //   allowNull: false,
        //   type: DataTypes.DATE,
        //   defaultValue: DataTypes .NOW,
        // },
        // updatedAt: {
        //   allowNull: false,
        //   type: DataTypes.DATE,
        //   defaultValue: DataTypes.NOW,
        // },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'User',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Company, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
    db.User.hasMany(db.Review, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
  }
}

module.exports = User;
