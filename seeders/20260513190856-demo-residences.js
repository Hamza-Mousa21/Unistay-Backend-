"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    /* ================= GET OWNER ID ================= */

    const owners = await queryInterface.sequelize.query(
      `SELECT user_id FROM Users WHERE email = 'john@example.com'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const owner_id = owners[0].user_id;

    /* ================= SEED RESIDENCES ================= */

    await queryInterface.bulkInsert("Residence", [
      {
        owner_id,
        title: "شقة فسيحة بالقرب من جامعة النجاح",
        description: "شقة مفروشة بالكامل، 3 غرف، واي فاي، مواقف سيارات، مناسبة للطلاب",
        housing_type: "شقة",
        available_for: "طلاب",
        address: "123 Main Street, Nablus",
        neighborhood: "رفيديا",
        rent_price: 500.00,
        distance_from_university: 300,
        floor_num: 2,
        building_num: "A1",
        capacity: 3,
        rooms: 3,
        bathrooms: 2,
        wifi: true,
        parking: true,
        security: false,
        is_available: true,
      },
      {
        owner_id,
        title: "استوديو بإطلالة رائعة",
        description: "استوديو حديث بإطلالة على المدينة، مفروش، واي فاي مجاني، قريب من الجامعة",
        housing_type: "استوديو",
        available_for: "الكل",
        address: "456 University Road, Nablus",
        neighborhood: "المشاريع",
        rent_price: 350.00,
        distance_from_university: 500,
        floor_num: 4,
        building_num: "B3",
        capacity: 1,
        rooms: 1,
        bathrooms: 1,
        wifi: true,
        parking: false,
        security: true,
        is_available: true,
      },
      {
        owner_id,
        title: "غرفة مفروشة قريبة من الحرم الجامعي",
        description: "غرفة مفروشة بالكامل، حمام خاص، أمن على مدار الساعة، للطالبات فقط",
        housing_type: "غرفة",
        available_for: "طالبات",
        address: "789 Student Ave, Nablus",
        neighborhood: "عصيرة الشمالية",
        rent_price: 250.00,
        distance_from_university: 200,
        floor_num: 1,
        building_num: null,
        capacity: 1,
        rooms: 1,
        bathrooms: 1,
        wifi: false,
        parking: false,
        security: true,
        is_available: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Residence", null, {});
  },
};