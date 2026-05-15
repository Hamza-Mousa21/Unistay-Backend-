"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch the actual user_ids by email
    const [jane] = await queryInterface.sequelize.query(
      `SELECT user_id FROM Users WHERE email = 'jane@example.com' LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const [admin] = await queryInterface.sequelize.query(
      `SELECT user_id FROM Users WHERE email = 'admin@example.com' LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("Students", [
      {
        user_id: jane.user_id,
        major: "Computer Science",
        year_of_study: 2,
        gender: "female",
      },
      {
        user_id: admin.user_id,
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