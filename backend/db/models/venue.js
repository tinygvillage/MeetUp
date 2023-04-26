'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {

    static associate(models) {

      Venue.hasMany(models.Event, {
        foreignKey: "venueId",
        onDelete: "SET NULL",
        hooks: true
      });
      Venue.belongsTo(models.Group, {
        foreignKey: "groupId",
        as: 'Venue',
        onDelete: 'SET NULL',
        hooks: true
      });
      Venue.belongsToMany(models.Group, {
        through: 'Event',
        foreignKey: 'venueId',
        otherKey: 'groupId',
      })
    }

    static onlineURLScope() {
      return {
        include: [{
          model: sequelize.models.Group,
          where: { type: 'Online' }
        }],
        attributes: {
          include: [
            ['address', 'URL', 'https://zoom.com']
          ],
          exclude: ['address'],
        },
      };
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Groups" },
      onDelete: "SET NULL",
      hooks: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    lat: {
      type: DataTypes.DECIMAL(9, 7),
      allowNull: true,
      validate: {
        isNumeric: true,
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true,
      validate: {
        isNumeric: true,
        min: -180,
        max: 180
      }
    },
  }, {
    sequelize,
    modelName: 'Venue',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
    scopes: {
      onlineUrl: {
        where: {
          type: 'Online',
          through: {
            model: "Group"
          }
        },
        attributes: {
          exclude: ["city", "state", "lat", "lng", "createdAt", "updatedAt"]
        }
      }
    }
  });
  return Venue;
};
