'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const members = [
  { userId: 1, groupId: 1, status: "organizer" },
  { userId: 2, groupId: 1, status: "member" },
  { userId: 5, groupId: 1, status: "member" },
  { userId: 8, groupId: 1, status: "pending" },
  { userId: 9, groupId: 1, status: "co-host" },

  { userId: 7, groupId: 2, status: "member" },
  { userId: 6, groupId: 2, status: "member" },
  { userId: 2, groupId: 2, status: "organizer" },
  { userId: 3, groupId: 2, status: "member" },
  { userId: 1, groupId: 2, status: "pending" },
  { userId: 5, groupId: 2, status: "member" },
  { userId: 4, groupId: 2, status: "member" },

  { userId: 9, groupId: 3, status: "member" },
  { userId: 8, groupId: 3, status: "pending" },
  { userId: 2, groupId: 3, status: "pending" },
  { userId: 4, groupId: 3, status: "member" },
  { userId: 6, groupId: 3, status: "co-host" },
  { userId: 1, groupId: 3, status: "member" },
  { userId: 3, groupId: 3, status: "organizer" },
  { userId: 7, groupId: 3, status: "pending" },

  { userId: 7, groupId: 4, status: "member" },
  { userId: 6, groupId: 4, status: "member" },
  { userId: 4, groupId: 4, status: "organizer" },
  { userId: 3, groupId: 4, status: "member" },
  { userId: 1, groupId: 4, status: "pending" },
  { userId: 5, groupId: 4, status: "member" },
  { userId: 2, groupId: 4, status: "member" },

]


module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkInsert(options, members);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkDelete(options, members);
  }
};
