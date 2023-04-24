'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const eventImages = [
  {
    eventId: "1",
    url: "../../../frontend/images/event1_rams_guild_first_meetup.jpeg",
    preview: true
  },
  {
    eventId: "2",
    url: "../../../frontend/images/event2_being_lab_first_meet.jpeg",
    preview: true
  },
  {
    eventId: "3",
    url: "../../../frontend/images/event3_armone_galaxy_launch.png",
    preview: true
  },
  {
    eventId: "4",
    url: "../../../frontend/images/event4_movement_lab_launch.png",
    preview: true
  },
];

options.tableName = 'EventImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, eventImages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, eventImages);
  }
};
