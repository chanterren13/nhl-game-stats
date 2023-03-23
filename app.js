import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./datasource.js";
import { getSchedule } from "./scripts/extractionUtils.js";
import { DBService } from "./services/DBService.js";

export const app = express();

app.use(bodyParser.json());

try {
  await sequelize.authenticate();
  // Automatically detect all of your defined models and create (or modify) the tables for you.
  // This is not recommended for production-use, but that is a topic for a later time!
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const dbService = new DBService();

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.get("/schedules", async function (req, res, next) {
  const schedule = await getSchedule();
  if (!schedule) {
    res.status(500).json({ error: "Error fetching schedule." });
    return;
  }
  res.json(schedule);
});

app.get("/teams", async function (req, res, next) {
  // console.log(req.query.ids.split(","));
  const ids = req.query.ids.split(",");
  const info = [];
  for (const id of ids) {
    const team = await dbService.getTeamById(id);
    if (!team) {
      res.status(404).json({ error: `Couldn't find team with id ${id}` });
      return;
    }
    info.push(team);
  }
  res.json(info);
});

app.get("/teams/:id/roster", async function (req, res, next) {
  // console.log(Object.keys(req.query).length === 0);
  const order =
    Object.keys(req.query).length === 0
      ? [["goals", "DESC"]]
      : [[req.query.field, req.query.order]];
  const roster = await dbService.getRoster(parseInt(req.params.id), order);

  if (roster.length === 0) {
    res
      .status(404)
      .json({
        error: `Couldn't find roster for team with id ${req.params.id}`,
      });
    return;
  }

  res.json(roster);
});

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
