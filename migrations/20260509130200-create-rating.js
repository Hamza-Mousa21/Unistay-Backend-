'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_Id: {
        type: Sequelize.INTEGER,
        references:{
          model:"Students",
          key:"user_id"
        }
      },
      res_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"Residence",
          key:"res_id"
        },
        onDelete:"CASCADE"
      },
      rateDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW 
      },
      starCount: {
        type: Sequelize.INTEGER,
        validate:{
          min:1,
          max:5
        }
      },
      comment: {
        type: Sequelize.TEXT
      },
      issues: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ratings');
  }
};