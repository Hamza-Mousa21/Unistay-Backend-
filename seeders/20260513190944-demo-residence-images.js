"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    /* ================= GET RESIDENCE IDs ================= */

    const residences = await queryInterface.sequelize.query(
      `SELECT res_id FROM Residence ORDER BY res_id ASC LIMIT 3`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const [res1, res2, res3] = residences.map(r => r.res_id);

    /* ================= SEED IMAGES ================= */

    await queryInterface.bulkInsert("Residence_Image", [
      {
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        res_id: res1,
        is_primary: true,
      },
      {
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        res_id: res1,
        is_primary: false,
      },
      {
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        res_id: res2,
        is_primary: true,
      },
      {
        image_url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
        res_id: res2,
        is_primary: false,
      },
      {
        image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        res_id: res3,
        is_primary: true,
      },
      {
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        res_id: res3,
        is_primary: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Residence_Image", null, {});
  },
};