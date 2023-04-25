'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {

    static associate(models) {

      Attendance.belongsTo(models.User, {
        foreignKey: "userId",

      });
      Attendance.belongsTo(models.Event, {
        foreignKey: "userId",

      });
    }
  }
  Attendance.init({
    status: {
      type: DataTypes.ENUM('pending', 'attending', 'waitlist'),
      allowNull: false,
      validate: {
        isIn: [['pending', 'attending', 'waitlist']]
      }
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
