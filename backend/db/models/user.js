'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Group, {
        foreignKey: "organizerId",
        as: 'Organizer',
        onDelete: "CASCADE",
        hooks: true
      })
      User.hasMany(models.Membership, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      })
      User.hasMany(models.Attendance, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      })
      User.belongsToMany(models.Group, {
        through: 'Membership',
        foreignKey: 'userId',
        otherKey: 'groupId'
      })
      User.belongsToMany(models.Event, {
        through: 'Attendance',
        foreignKey: 'userId',
        otherKey: 'eventId'
      })
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
            isNotEmail(value) {
              if (Validator.isEmail(value)) {
                throw new Error("Cannot be an email.");
              }
            }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
            isNotEmail(value) {
              if (Validator.isEmail(value)) {
                throw new Error("Cannot be an email.");
              }
            }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "updatedAt", "createdAt", "email"]
      }
    },
    scopes: {
      // searchUser: {
      //   attributes: {
      //     exclude: ["hashedPassword"]
      //   }
      // }
    },
  });
  return User;
};
