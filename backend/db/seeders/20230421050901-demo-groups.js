'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

const { Op } = require('sequelize');

const groups = [
  {
    "organizerId": "1",
    "name": "Refusion Activation Method Guild",
    "about": "A network of individuals that have committed themselves to the refusion lifestyle and practices.",
    "type": "In person",
    "private": true,
    "city": "New York",
    "state": "NY",
  },
  {
    "organizerId": "2",
    "name": "Armone Galaxy",
    "about": "A gaming group devoted to educational game development that focuses primarily on regeneration principles for stewarding the earth.",
    "type": "Online",
    "private": false,
    "city": "Everywhere",
    "state": "The Universe",
  },
  {
    "organizerId": "3",
    "name": "Being Lab",
    "about": "Coming together to share in communal meditation and social hour thereafter.",
    "type": "Online",
    "private": false,
    "city": "Everywhere",
    "state": "Universe",
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', groups)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups', { [Op.or]: groups })
  }
};
