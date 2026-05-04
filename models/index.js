import { readdirSync, readFileSync } from "fs";
import { Sequelize } from "sequelize";
import process from "process";

const configUrl = new URL("../config/config.json", import.meta.url);
const configJson = JSON.parse(readFileSync(configUrl, "utf8"));
const env = process.env.NODE_ENV || "development";
const config = configJson[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const db = { sequelize, Sequelize };

async function loadModels() {
  const modelFiles = readdirSync("./").filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file.slice(-3) === ".js",
  );

  await Promise.all(
    modelFiles.map(async (file) => {
      const modelModule = await import(`./${file}`);
      const model = modelModule.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }),
  );

  Object.keys(db).forEach((modelName) => {
    if (db[modelName]?.associate) {
      db[modelName].associate(db);
    }
  });
}

export default db;
export { loadModels };
export { sequelize };
