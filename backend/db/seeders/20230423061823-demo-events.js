'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const events = [
  {
    venueId: 2,
    groupId: 1,
    name: "RAM's Guild First Meeting",
    description: "First meet and greet event for all the members of the RAM's Guild!",
    type: "In Person",
    capacity: 50,
    price: 18.50,
    startDate: "2023-06-07 20:00:00",
    endDate: "2023-06-07 23:00:00"
  },
  {
    venueId: 3,
    groupId: 3,
    name: "Being Lab First Meditation Gathering",
    description: "Come be and sit in silence with our first online gathering. There will be a Q&A session after.",
    type: "Online",
    capacity: 100,
    price: 0,
    startDate: "2023-06-23 10:00:00",
    endDate: "2023-06-23 12:00:00"
  },
  {
    venueId: 4,
    groupId: 2,
    name: "Armone Galaxy Launch Party",
    description: "Join this public event to help celebrate the launch of the Armone Galaxy game! Join us online for an incredible moment in history!",
    type: "Online",
    capacity: 500,
    price: 0,
    startDate: "2023-08-08 00:00:00",
    endDate: "2023-08-09 24:00:00"
  },
  {
    venueId: 2,
    groupId: 4,
    name: "Movement Lab Launch",
    description: "Join in our celebration of movement and dance at our launch party. All are welcome, all ages and family friendly.",
    type: "In Person",
    capacity: 100,
    price: 0,
    startDate: "2023-09-09 17:00:00",
    endDate: "2023-09-09 20:00:00"
  },
];



module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.bulkInsert(options, events);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.bulkDelete(options, events);
  }
};
