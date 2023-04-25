'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {

    static associate(models) {

      Event.hasMany(models.EventImage, {
        foreignKey: "eventId",
        onDelete: "CASCADE",
        hooks: true
      });
      Event.hasMany(models.Attendance, {
        foreignKey: "eventId",
        onDelete: "CASCADE",
        hooks: true
      });
      Event.belongsTo(models.Venue, {
        foreignKey: "venueId",

      });
      Event.belongsTo(models.Group, {
        foreignKey: "groupId",

      });
      Event.belongsToMany(models.User, {
        through: 'Attendance',
        foreignKey: 'eventId',
        otherKey: 'userId',
        onDelete: "CASCADE",
        hooks: true
      })
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER,
      references: { model: "Venues" },
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: { model: "Groups" },
      onDelete: "CASCADE",
      hooks: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Online", "In Person"),
      allowNull: false,
      validate: {
        isIn: [['Online', 'In person']]
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isInTheFuture(input_date) {
          if (input_date <= Date()) {
            throw new Error('Start date must be in the future')
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        endDateIsAfterStart(input_date) {
          if (input_date < this.startDate) {
            throw new Error('End date must come after start date')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Event',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
  });
  return Event;
};
