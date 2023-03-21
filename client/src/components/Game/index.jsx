import React, { useEffect, useState } from "react";
import "./Game.css";
import Team from "../Team";

export default function Game({ homeTeam, awayTeam, date }) {
  const [gameTime, setGameTime] = useState();

  const parseDate = (date) => {
    const d = new Date(date);
    const hour = d.getHours();
    const min = d.getMinutes();

    let minString = min.toString();
    if (min === 0) {
      minString = minString + "0";
    }
    if (hour > 12) {
      return `${(hour - 12).toString()}:${minString}`;
    }
    return `${hour.toString()}:${minString}`;
  };

  useEffect(() => {
    setGameTime(parseDate(date));
  }, [date]);

  return (
    <div>
      {gameTime}
      <div className="team-box">
        <Team teamInfo={homeTeam.team} record={homeTeam.leagueRecord}></Team>
        <span className="vs">VS</span>
        <Team teamInfo={awayTeam.team} record={awayTeam.leagueRecord}></Team>
      </div>
    </div>
  );
}
