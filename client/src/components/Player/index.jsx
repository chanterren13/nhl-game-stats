import React from "react";
import "./Player.css";

export default function Player({ info }) {
  // Needs time to fetch then render
  return (
    <div className="player-content player-content-sm">
      <div className="player-col">
        <h4>
          {info.name} - {info.position}
        </h4>
      </div>
      <div className="player-col">
        <h4>
          <span className="stat">GP: {info.gamesPlayed}</span>
          <span className="stat">G: {info.goals}</span>
          <span className="stat">A: {info.assists}</span>
          <span className="stat">P: {info.points}</span>
          <span className="stat">SH%:{info.shotPct}</span>
        </h4>
      </div>
    </div>
  );
}
