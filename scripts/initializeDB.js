import { getTeamInfo, getRosterInfo } from "./extractionUtils.js";

const extractData = async () => {
  const teamIds = await getTeamInfo();

  for (const id of teamIds) {
    await getRosterInfo(id);
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

await extractData();
