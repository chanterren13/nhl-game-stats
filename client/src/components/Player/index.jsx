import React, { useContext } from "react";
import { PinPlayerContext } from "../../contexts/PinPlayerContext";
import "./Player.css";
import { FlameIcon, PinIcon, XIcon } from "@primer/octicons-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

const Player = ({ info, pinned = false }) => {
  const pinPlayer = useContext(PinPlayerContext);

  const handlePin = () => {
    pinPlayer.setPlayer(info);
  };

  const handleClose = () => {
    document.querySelector(".pin-section").classList.add("close-pin");
    setTimeout(() => {
      pinPlayer.setPlayer(null);
    }, 495);
  };

  return (
    <Row className="player-content bg-secondary py-2">
      <Col xs={1}>
        {info.gStrk > 0 ? <FlameIcon size={16} fill="#ff8438"></FlameIcon> : ""}
      </Col>
      <Col xs={11} lg={4}>
        <div className="text-middle text-md-start name">
          {info.name} - {info.position}
        </div>
      </Col>
      <Col className="text-middle text-md-end stats" xs={10} lg={6}>
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
      <Col xs={1}>
        {pinned ? (
          <div onClick={handleClose}>
            <XIcon size={16}></XIcon>
          </div>
        ) : (
          <div onClick={handlePin}>
            <PinIcon size={16}></PinIcon>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Player;
