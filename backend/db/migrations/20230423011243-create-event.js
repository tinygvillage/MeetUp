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
        references: { model: "Venues"},
        // onDelete: "SET NULL",
        // hooks: true
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: { model: "Groups"},
        // onDelete: "SET NULL",
        // hooks: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.ENUM("Online", "In Person"),
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(4,2)
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
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
    options.tableName = 'Events';
    await queryInterface.dropTable(options);
  }
};
