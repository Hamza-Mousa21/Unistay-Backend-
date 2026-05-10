"use strict";

const fs = require("fs");

const path = require("path");

const Sequelize = require("sequelize");

const process = require("process");

/**
 * ==================================================
 * DATABASE CONFIGURATION
 * ==================================================
 */

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";

const config = require("../config/config.json")[env];

/**
 * ==================================================
 * DATABASE OBJECT
 * ==================================================
 */

const db = {};

/**
 * ==================================================
 * SEQUELIZE CONNECTION
 * ==================================================
 */

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

/**
 * ==================================================
 * LOAD ALL MODELS
 * ==================================================
 */

fs.readdirSync(__dirname)

  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })

  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );

    db[model.name] = model;
  });

/**
 * ==================================================
 * EXECUTE MODEL ASSOCIATIONS
 * ==================================================
 */

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/**
 * ==================================================
 * EXPORT DATABASE & SEQUELIZE
 * ==================================================
 */

db.sequelize = sequelize;

db.Sequelize = Sequelize;

module.exports = db;
