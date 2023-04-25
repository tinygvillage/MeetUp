'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {}; // added april 19, 2023

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    await queryInterface.createTable('Attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: { model: "Events" },
        onDelete: "SET NULL",
        hooks: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users" },
        onDelete: "SET NULL",
        hooks: true
      },
      status: {
        type: Sequelize.ENUM("pending", "attending", "waitlist"),
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
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    await queryInterface.dropTable(options);
  }
};
