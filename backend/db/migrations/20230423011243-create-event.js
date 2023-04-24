'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Events'; // added april 19, 2023

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      venueId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Venues", key: "id" },
        onDelete: "CASCADE",
        hooks: true
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Groups", key: "id" },
        onDelete: "CASCADE",
        hooks: true
      },
      name: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.ENUM("Online", "In Person"),
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable(options);
  }
};
