'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {

    static associate(models) {

      Membership.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      Membership.belongsTo(models.Group, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE"
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: "Groups", key: "id" },
      onDelete: "CASCADE"
    },
    status: {
      type: DataTypes.ENUM("co-host", "member", "pending"),
      allowNull: false,
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
