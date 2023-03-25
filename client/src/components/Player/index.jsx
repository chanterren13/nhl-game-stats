import React from "react";
import "./Player.css";
import { FlameIcon } from "@primer/octicons-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

export default function Player({ info }) {
  // Needs time to fetch then render
  return (
    <Row className="player-content bg-secondary py-2">
      <Col xs={1}>
        {info.gStrk > 0 ? <FlameIcon size={16} fill="#ff8438"></FlameIcon> : ""}
      </Col>
      <Col xs={11} lg={4}>
        <div className="text-middle text-md-start fs-6">
        {info.name} - {info.position}
        </div>
      </Col>
      <Col className="text-middle text-md-end fs-6">
        <span className="stat mx-1">GP: {info.gamesPlayed}</span>
        <div className="vr"></div>
        <span className="stat mx-1">G: {info.goals}</span>
        <div className="vr"></div>
        <span className="stat mx-1">A: {info.assists}</span>
        <div className="vr"></div>
        <span className="stat mx-1">P: {info.points}</span>
        <div className="vr"></div>
        <span className="stat mx-1">S%: {info.shotPct}</span>
      </Col>
    </Row>
  );
}
