'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {

    static associate(models) {

      Attendance.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      Attendance.belongsTo(models.Event, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }
  Attendance.init({
    status: {
      type: DataTypes.ENUM("pending", "attending", "waitlist"),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
