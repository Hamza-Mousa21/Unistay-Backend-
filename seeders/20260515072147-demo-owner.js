"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    /* ================= GET EXISTING OWNER USER ID ================= */

    const owners = await queryInterface.sequelize.query(
      `SELECT user_id FROM Users WHERE email = 'john@example.com'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    /* ================= SEED OWNERS ================= */

    await queryInterface.bulkInsert("Owner", [
      {
        user_id: owners[0].user_id,
        phone_num: "970591234567",
        verification: true,
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Owner", null, {});
  },
};