'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const usersInfo = [
  {
    firstName: "John", // 1
    lastName: "Doe",
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Susie", //2
    lastName: "Smith",
    email: 'user1@user.io',
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Blain", // 3
    lastName: "Cougare",
    email: 'user2@user.io',
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Yusef",  // 4
    lastName: "Coldwell",
    email: 'yus.cold@gmail.com',
    username: 'yus.cold',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Marissa", // 5
    lastName: "Taylor",
    email: 'm.tay@gmail.com',
    username: 'taytay',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Cory", // 6
    lastName: "Rocker",
    email: 'coryrocker@gmail.com',
    username: 'batmanmortal',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Nancy",  // 7
    lastName: "Bueler",
    email: 'n.bueler93@gmail.com',
    username: 'nbueler93',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Xavier", // 8
    lastName: "Rudd",
    email: 'xorudd@gmail.com',
    username: 'xorudd',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Harry", // 9
    lastName: "Truman",
    email: 'monsieurtruman@gmail.com',
    username: 'monsieurtruman',
    hashedPassword: bcrypt.hashSync('password')
  },
]

options.tableName = "Users";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, usersInfo);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, usersInfo);
  }
};
