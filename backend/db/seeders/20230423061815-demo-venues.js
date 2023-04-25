'use strict';


/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const venues = [
  {
    "groupId": 4,
    "address": "300 Dr. M.L.K. Jr Pkwy",
    "city": "Arcata",
    "state": "CA",
    "lat": 40.865431,
    "lng": -124.079746
  },
  {
    "groupId": 1,
    "address": "905 6th Street",
    "city": "Arcata",
    "state": "CA",
    "lat": 40.866766,
    "lng": -124.089093
  },
  {
    "groupId": 3,
    "address": "https://beinglab.com"

  },
  {
    "groupId": 2,
    "address":"https://armonegalaxy.com"

  },
]

options.tableName = "Venues";

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.bulkInsert(options, venues);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.bulkDelete(options, venues);
  }
};
