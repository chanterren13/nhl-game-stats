import dotenv from "dotenv";
dotenv.config();
const constants = {
  PORT: process.env.PORT || "5000",
  DB_PATH: process.env.DB_PATH || "../db/nhl-game-stats.sqlite",
  DOMAIN: process.env.DOMAIN || "http://localhost:5000",
};

export default constants;
