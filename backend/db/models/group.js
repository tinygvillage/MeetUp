'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {

      Group.belongsTo(models.User, {
        foreignKey: 'organizerId',

      });

      Group.hasMany(models.Membership, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Group.hasMany(models.Venue, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Group.hasMany(models.Event, {
        foreignKey: 'groupId',
        onDelete: "SET NULL",
        hooks: true
      });
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1, 6],
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 60],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [50],
          msg: "Please write at least 50 characters"
        }
      }
    },
    type: {
      type: DataTypes.ENUM("Online", "In Person"),
      allowNull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
  }, {
    sequelize,
    modelName: 'Group',
    defaultScope: {
      attributes: {
        exclude: ["updatedAt", "createdAt"]
      }
    },
  });
  return Group;
};
