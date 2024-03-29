import React, { useEffect, useState } from "react";
import "./Game.css";
import Team from "../Team";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Game = ({ homeTeam, awayTeam, date }) => {
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
      @ {gameTime}
      <Row className="g-0">
        <Col>
          <Team teamInfo={homeTeam.team} record={homeTeam.leagueRecord}></Team>
        </Col>
        <Col lg={1} xs={12} className="d-flex flex-wrap justify-content-center">
          <span className="vs">VS</span>
        </Col>
        <Col>
          <Team teamInfo={awayTeam.team} record={awayTeam.leagueRecord}></Team>
        </Col>
      </Row>
    </div>
  );
};

export default Game;
