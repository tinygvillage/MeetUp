'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
        onDelete: "CASCADE",
        hooks: true
      });
      Event.belongsTo(models.Group, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
        hooks: true
      });

    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Venues", key: "id" },
      onDelete: "CASCADE",
      hooks: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Groups", key: "id" },
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
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
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
