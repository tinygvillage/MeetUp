'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Groups'; // added april 19, 2023

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organizerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: "Users", key: "id" },
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM("Online", "In Person"),
        defaultValue: null
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Groups');
  }
};
