'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {

    static associate(models) {

      Venue.hasMany(models.Event, {
        foreignKey: "venueId",
        onDelete: "CASCADE",
        hooks: true
      });
      Venue.belongsTo(models.Group, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
        hooks: true
      });
    }

    static onlineURLScope() {
      return {
        include: [{
          model: sequelize.models.Group,
          where: { type: 'Online'}
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
      references: { model: "Groups", key: "id" },
      onDelete: "CASCADE",
      hooks: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Online"
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
      type: DataTypes.DECIMAL(4, 8),
      allowNull: true,
      validate: {
        isNumeric: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL(4, 8),
      allowNull: true,
      validate: {
        isNumeric: true
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
