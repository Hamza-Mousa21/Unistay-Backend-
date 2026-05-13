"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Residence", [
      {
        description: "Spacious apartment near An-Najah University",
        is_available: true,
        floor_num: 2,
        address: "123 Main Street, Nablus",
        rent_price: 500.00,
        building_num: "A1",
        owner_id: 1, 
      },
      {
        description: "Studio apartment with great view",
        is_available: true,
        floor_num: 4,
        address: "456 University Road, Nablus",
        rent_price: 350.00,
        building_num: "B3",
        owner_id: 1,
      },
      {
        description: "Furnished room close to campus",
        is_available: false,
        floor_num: 1,
        address: "789 Student Ave, Nablus",
        rent_price: 250.00,
        building_num: null,
        owner_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Residence", null, {});
  },
};