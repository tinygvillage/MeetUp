'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

const groups = [
  {
    organizerId: 1,
    name: "Refusion Activation Method Guild",
    about: "A network of individuals that have committed themselves to the refusion lifestyle and practices.",
    type: "In Person",
    private: true,
    city: "Arcata",
    state: "CA",
  },
  {
    organizerId: 2,
    name: "Armone Galaxy",
    about: "A gaming group devoted to educational game development that focuses primarily on regeneration principles for stewarding the earth.",
    type: "Online",
    private: false,
    city: "Everywhere",
    state: "The Universe",
  },
  {
    organizerId: 3,
    name: "Being Lab",
    about: "Coming together to share in communal meditation and social hour thereafter.",
    type: "Online",
    private: false,
    city: "Everywhere",
    state: "Universe",
  },
  {
    organizerId: 4,
    name: "Movement Lab",
    about: "Coming together to share in communal yoga class.",
    type: "In Person",
    private: false,
    city: "Arcata",
    state: "CA",
  },
]

options.tableName = "Groups"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, groups)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, groups)
  }
};
