'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const attendanceList = [
  // event1  // group 1
  { eventId: "1", userId: "1", status: "attending" }, // def attending, cuz they're hosting
  { eventId: "1", userId: "2", status: "attending" },
  { eventId: "1", userId: "5", status: "attending" },
  { eventId: "1", userId: "9", status: "attending" },
  { eventId: "1", userId: "8", status: "pending" },

  // event2 // group 3
  { eventId: "2", userId: "3", status: "attending" }, // def attending, cuz they're hosting
  { eventId: "2", userId: "9", status: "waitlist" },
  { eventId: "2", userId: "8", status: "pending" },
  { eventId: "2", userId: "2", status: "pending" },
  { eventId: "2", userId: "4", status: "attending" },
  { eventId: "2", userId: "6", status: "attending" },
  { eventId: "2", userId: "1", status: "attending" },
  { eventId: "2", userId: "7", status: "pending" },


  // event3 // group 2
  { eventId: "3", userId: "2", status: "attending" }, // def attending, cuz they're hosting
  { eventId: "3", userId: "7", status: "attending" },
  { eventId: "3", userId: "6", status: "pending" },
  { eventId: "3", userId: "3", status: "attending" },
  { eventId: "3", userId: "1", status: "pending" },
  { eventId: "3", userId: "5", status: "pending" },
  { eventId: "3", userId: "4", status: "waitlist" },


  // event4 // group 4
  { eventId: "4", userId: "4", status: "attending" }, // def attending, cuz they're hosting
  { eventId: "4", userId: "7", status: "attending" },
  { eventId: "4", userId: "6", status: "attending" },
  { eventId: "4", userId: "3", status: "waitlist" },
  { eventId: "4", userId: "1", status: "pending" },
  { eventId: "4", userId: "5", status: "attending" },
  { eventId: "4", userId: "2", status: "attending" },
];

options.tableName = 'Attendances';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, attendanceList);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, attendanceList);
  }
};
