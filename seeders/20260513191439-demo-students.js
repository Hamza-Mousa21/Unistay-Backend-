"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Students", [
      {
        user_id: 2, // 👈 must match Jane's user_id (student role)
        major: "Computer Science",
        year_of_study: 2,
        gender: "female",
       
      },
      {
        user_id: 3, // 👈 adjust based on actual user_ids
        major: "Engineering",
        year_of_study: 1,
        gender: "male",
        
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Students", null, {});
  },
};