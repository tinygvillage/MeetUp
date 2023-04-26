'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {

    static associate(models) {

      Attendance.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Attendance.belongsTo(models.Event, {
        foreignKey: "eventId",
      });
    }
  }
  Attendance.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events'
      },
      onDelete: 'SET NULL',
      hooks: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
      onDelete: 'SET NULL',
      hooks: true
    },
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
