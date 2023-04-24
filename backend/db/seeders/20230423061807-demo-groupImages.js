'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const groupImages = [
  {
    groupId: "1",
    url: "../../../frontend/images/group1_refusionist_activation_method_guild.png",
    preview: true
  },
  {
    groupId: "2",
    url: "../../../frontend/images/group2_armone_galaxy.jpg",
    preview: true
  },
  {
    groupId: "3",
    url: "../../../frontend/images/group3_being_lab.png",
    preview: true
  },
  {
    groupId: "4",
    url: "../../../frontend/images/group4_movement_lab.png",
    preview: true
  },
]

options.tableName = "GroupImages";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, groupImages);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, groupImages);
  }
};
