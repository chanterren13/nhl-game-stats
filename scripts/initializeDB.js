import axios from "axios";
import { Team } from "../models/team.js";
import { Player } from "../models/player.js";
import { sequelize } from "../datasource.js";

try {
  await sequelize.authenticate();
  // Automatically detect all of your defined models and create (or modify) the tables for you.
  // This is not recommended for production-use, but that is a topic for a later time!
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// get all team info and collect ids
const getTeamInfo = async () => {
  const config = {
    url: "https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats",
    method: "GET",
  };

  const res = await axios(config);

  const teamIds = [];
  for (const team of res.data.teams) {
    const info = team.teamStats[0].splits[0];
    // update team wins/losses/ot losses
    const teamStats = {
      wins: info.stat.wins,
      losses: info.stat.losses,
      otLosses: info.stat.ot,
      apiId: info.team.id,
      name: info.team.name,
    };
    const check = await Team.create(teamStats);
    if (!check) {
      console.log(`error at ${teamStats.name}`);
      return;
    }
    teamIds.push(teamStats.apiId);
  }

  return teamIds;
};

const getRosterInfo = async (id) => {
  // get all player info
  const config = {
    url: `https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`,
    method: "GET",
  };

  const res = await axios(config);
  const playerIds = [];

  res.data.roster.forEach((player) => {
    playerIds.push({
      name: player.person.fullName,
      apiId: player.person.id,
      position: player.position.abbreviation,
      teamId: id,
    });
  });

  const cleanPlayerIds = playerIds.filter((obj) => {
    return obj.position !== "G";
  });

  for (const obj of cleanPlayerIds) {
    const playerConfig = {
      url: `https://statsapi.web.nhl.com/api/v1/people/${obj.apiId}/stats?stats=statsSingleSeason&season=20222023`,
      method: "GET",
    };
    axios(playerConfig)
      .then(async (response) => {
        if (!response.data.stats[0].splits[0]) {
          console.error(`${obj.apiId} has no stats.`);
          return;
        }
        const data = response.data.stats[0].splits[0].stat;
        // update goals/assists/pts/streaks
        const playerStats = {
          goals: data ? data.goals : 0,
          assists: data ? data.assists : 0,
          points: data ? data.points : 0,
          shotPct: data ? data.shotPct : 0,
          name: obj.name,
          position: obj.position,
          TeamApiId: obj.teamId,
          apiId: obj.apiId,
        };

        const player = await Player.create(playerStats);
        if (!player) {
          console.error(`Error at ${obj.apiId}.`);
          return;
        }
      })
      .catch((err) => console.error(err));
    // console.log(obj);
  }
};

export const extractData = async () => {
  const teamIds = await getTeamInfo();

  for (const id of teamIds) {
    await getRosterInfo(id);
  }
};

// get schedule??
export const getSchedule = async () => {
  const scheduleConfig = {
    url: "https://statsapi.web.nhl.com/api/v1/schedule",
    method: "GET",
  };

  const res = await axios(scheduleConfig);
  // console.log(res.data.dates[0].games);
  const schedule = [];
  res.data.dates[0].games.forEach((game) => {
    const gameData = {
      id: game.gamePk,
      home: game.teams.home,
      away: game.teams.away,
      date: game.gameDate,
    };
    // console.log(gameData);
    schedule.push(gameData);
  });
  return schedule;
};

await extractData();
