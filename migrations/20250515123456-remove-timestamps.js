"use strict";

module.exports = {
  up: async (queryInterface) => {
    const tableNames = [
      "Students",
      "Users",
      "Owner",
      "Rating",
      "WishList",
      "Residence",
      "Residence_Image",
    ];

    const allTables = await queryInterface.showAllTables();

    for (const table of tableNames) {
      if (!allTables.includes(table)) continue;

      const tableDesc = await queryInterface.describeTable(table);

      if (tableDesc.createdAt) {
        await queryInterface.removeColumn(table, "createdAt");
      }
      if (tableDesc.updatedAt) {
        await queryInterface.removeColumn(table, "updatedAt");
      }
    }
  },

  down: async () => {},
};
