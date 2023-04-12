import { Sequelize } from "sequelize";
import constants from "../src/constants.js";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: constants.DB_PATH,
});
