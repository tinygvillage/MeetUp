'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventImage extends Model {

    static associate(models) {

      EventImage.belongsTo(models.Event, {
        foreignKey: "eventId",
      });
    }
  }
  EventImage.init({
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events'
      },
      onDelete: 'SET NULL',
      hooks: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'EventImage',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
  });
  return EventImage;
};
