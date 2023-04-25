'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Venues'; // added april 19, 2023

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "Groups", key: "id"},
        onDelete: "SET NULL",
        hooks: true
      },
      address: {
        type: Sequelize.STRING(100)
      },
      city: {
        type: Sequelize.STRING(50)
      },
      state: {
        type: Sequelize.STRING(30)
      },
      lat: {
        type: Sequelize.DECIMAL(4, 8)
      },
      lng: {
        type: Sequelize.DECIMAL(4, 8)
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
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.dropTable(options);
  }
};
