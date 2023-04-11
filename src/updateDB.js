import {
  updateTeams,
  updatePlayers,
  getSchedule,
  parseSchedule,
} from "./scripts/extractionUtils.js";
import { sequelize } from "./db/datasource.js";
import { DBService } from "./services/DBService.js";

export const updateDB = async (schedule) => {
  const ids = parseSchedule(schedule);
  await updateTeams(ids);
  for (const id of ids) {
    await updatePlayers(id);
  }
};

try {
  await sequelize.authenticate();
  // Automatically detect all of your defined models and create (or modify) the tables for you.
  // This is not recommended for production-use, but that is a topic for a later time!
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// const yesterday = new Date();
// yesterday.setDate(yesterday.getDate() - 1);
// const dateStr = [
//   yesterday.getFullYear(),
//   yesterday.getMonth() + 1,
//   yesterday.getDate(),
// ].join("-");
// console.log(`Getting schedule for ${dateStr}...`);
// const schedule = await getSchedule(dateStr);
// await updateDB(schedule);
const service = new DBService();
await service.updatePlayer("8475287", { goals: 9 });
