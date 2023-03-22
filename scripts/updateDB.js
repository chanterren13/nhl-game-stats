import axios from "axios";
import { Team } from "../models/team.js";
import { Player } from "../models/player.js";
import { sequelize } from "../datasource.js";

// try {
//   await sequelize.authenticate();
//   // Automatically detect all of your defined models and create (or modify) the tables for you.
//   // This is not recommended for production-use, but that is a topic for a later time!
//   await sequelize.sync({ alter: { drop: false } });
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

const updateTeams = async (ids) => {
    const apiString = ids.join(',');

    const config = {
        url: `https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats&teamIds=${apiString}`,
        method: "GET",
      };
    
      const res = await axios(config);

      for (const team of res.data.teams) {
        const info = team.teamStats[0].splits[0];
        // update team wins/losses/ot losses
        const teamStats = {
          wins: info.stat.wins,
          losses: info.stat.losses,
          otLosses: info.stat.ot,
        };
        const check = await Team.update(teamStats, {
            where: {
                apiId: info.team.id
            }
        });
        if (!check) {
          console.log(`error at ${teamStats.name}`);
          return;
        }
      }
}

const updatePlayers = async (id) => {
// get all player info
const config = {
    url: `https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`,
    method: "GET",
  };

  const res = await axios(config);
  const playerIds = [];

  res.data.roster.forEach((player) => {
    playerIds.push({
      apiId: player.person.id,
      position: player.position.abbreviation,
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
          goals: data.goals,
          assists: data.assists,
          points: data.points,
          shotPct: data.shotPct,
        };

        const player = await Player.update(playerStats, {
            where: {
                apiId: obj.apiId
            }
        });
        if (!player) {
          console.error(`Error at ${obj.apiId}.`);
          return;
        }
      })
      .catch((err) => console.error(err));
    // console.log(obj);
  }
}

const parseSchedule = (schedule) => {
    const ids = [];
    schedule.forEach((game) => {
        ids.push(game.home.team.id, game.away.team.id);
    });
    return ids;
}

export const updateDB = async (schedule) => {
    const ids = parseSchedule(schedule);
    await updateTeams(ids);
    for (const id of ids) {
        await updatePlayers(id);
    }
}
