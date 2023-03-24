import React from "react";
import "./Player.css";

export default function Player({ info }) {
  // Needs time to fetch then render
  return (
    <div className="player-content player-content-sm">
      <div className="player-col fs-5">
          {info.name} - {info.position}
      </div>
      <div className="player-col fs-6">
          <span className="stat">GP: {info.gamesPlayed}</span>
          <div className="vr"></div>
          <span className="stat">G: {info.goals}</span>
          <span className="stat">A: {info.assists}</span>
          <span className="stat">P: {info.points}</span>
          <span className="stat">SH%:{info.shotPct}</span>
      </div>
    </div>
  );
}
