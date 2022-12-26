'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('AirplaneAuthorities', [{
    name: 'Indigo',
    domainName: 'indigo',
    createdAt: new Date(),
    updatedAt: new Date()
   }, {
    name: 'Vistara',
    domainName: 'vistara',
    createdAt: new Date(),
    updatedAt: new Date()
   }, {
    name: 'Air India',
    domainName: 'airindia',
    createdAt: new Date(),
    updatedAt: new Date()
   }, {
    name: 'SpiceJet',
    domainName: 'spicejet',
    createdAt: new Date(),
    updatedAt: new Date()
   }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
