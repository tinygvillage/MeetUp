'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {

    static associate(models) {

      Membership.belongsTo(models.User, {
        foreignKey: "userId",

      }),
        Membership.belongsTo(models.Group, {
          foreignKey: "userId",

        });
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      references: { model: "Users" },
      // onDelete: "CASCADE"
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: { model: "Groups" },
      // onDelete: "CASCADE"
    },
    status: {
      type: DataTypes.ENUM('organizer', 'co-host','member','pending'),
      validate: {
        isIn: [['organizer', 'co-host','member','pending']]
      }
    },
  }, {
    sequelize,
    modelName: 'Membership',
    defaultScope: {
      attributes: {
        exclude: ["createAt", "updatedAt"]
      }
    }
  });
  return Membership;
};
