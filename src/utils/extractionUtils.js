import axios from "axios";
import { DBService } from "../services/DBService.js";

export const updateTeams = async (ids) => {
  const dbService = new DBService();
  const apiString = ids.join(",");
  const config = {
    url: `https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats&teamIds=${apiString}`,
    method: "GET",
  };

  try {
    const res = await axios(config);
    for (const team of res.data.teams) {
        const info = team.teamStats[0].splits[0];
        // update team wins/losses/ot losses
        const teamStats = {
          wins: info.stat.wins,
          losses: info.stat.losses,
          otLosses: info.stat.ot,
        };
        const check = await dbService.updateTeam(info.team.id, teamStats);
    
        if (!check) {
          console.log(`error at ${teamStats.name}`);
          return;
        }
      }
  } catch (error) {
    console.log(error);
    throw new Error("Error updating teams.");
  }
};

export const updatePlayers = async (id) => {
  // get all player info
  const dbService = new DBService();
  const config = {
    url: `https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`,
    method: "GET",
  };

  try {
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
            gamesPlayed: data.games,
          };
  
          const player = await dbService.updatePlayer(obj.apiId, playerStats);
  
          if (!player) {
            console.error(`Error at ${obj.apiId}.`);
            return;
          }
        })
        .catch((err) => console.error(err));
      // console.log(obj);
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Error updating team id ${id}`);
  }
};

export const parseSchedule = (schedule) => {
  const ids = [];
  schedule.forEach((game) => {
    ids.push(game.home.team.id, game.away.team.id);
  });
  return ids;
};

export const updateDB = async (schedule) => {
  const ids = parseSchedule(schedule);
  await updateTeams(ids);
  for (const id of ids) {
    await updatePlayers(id);
  }
};

export const getTeamInfo = async () => {
  const dbService = new DBService();
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
    const check = await dbService.addTeam(teamStats);
    if (!check) {
      console.log(`error at ${teamStats.name}`);
      return;
    }
    teamIds.push(teamStats.apiId);
  }

  return teamIds;
};

// get schedule??
export const getSchedule = async (date = null) => {
  let url = "https://statsapi.web.nhl.com/api/v1/schedule";
  if (date) {
    url = url + `?date=${date}`;
  }
  const scheduleConfig = {
    url: url,
    method: "GET",
  };

  try {
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
  } catch (error) {
    console.log(error);
    throw new Error("Error gettinh schedule");
  }
};
