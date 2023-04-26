'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'EventImages'; // added april 19, 2023

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EventImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Events', key: "id" },
        onDelete: "SET NULL",
        hooks: true
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      preview: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    options.tableName = 'EventImages';
    await queryInterface.dropTable(options);
  }
};
