const Sequelize = require('sequelize');

class Review extends Sequelize.Model {
  static initiate(sequelize) {
    Review.init(
      {
        reviewId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        reservationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        rate: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Review',
        tableName: 'reviews',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Review.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    });
  }
}

module.exports = Review;
