import React, { useCallback, useContext, useEffect } from "react";
import "./Team.css";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@primer/octicons-react";
// import Roster from '../Roster';
import axios from "axios";
import Player from "../Player";
import { SortMethodContext } from "../../contexts/SortMethodContext";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/esm/Collapse";

export default function Team({ record, teamInfo }) {
  const [expanded, setExpanded] = useState(false);
  const [roster, setRoster] = useState();
  const [id, setId] = useState();

  const sortMethod = useContext(SortMethodContext);

  const fetchRoster = useCallback(() => {
    const config = {
      method: "get",
      //   url: `https://statsapi.web.nhl.com${teamInfo.link}/roster`,
      url: `http://localhost:5000/teams/${teamInfo.id}/roster?field=${sortMethod.options.method}&order=${sortMethod.options.order}`,
      headers: {},
    };

    axios(config)
      .then((res) => {
        setRoster(res.data);
      })
      .catch((e) => console.log(e));
  }, [teamInfo.id, sortMethod.options]);

  useEffect(() => {
    fetchRoster();
    setId(teamInfo.id.toString());
  }, [teamInfo.link, teamInfo.id, fetchRoster]);

  const handleExpand = (expand) => {
    setExpanded(expand);
    // document.getElementById(`roster-${id}`).classList.toggle("hidden");
  };

  return (
    <div className="team team-sm">
      {/* <div
        className="team-section row align-items-center"
        onClick={() => handleExpand(!expanded)}
      ></div> */}

      <Row
        className="team-section align-items-center"
        onClick={() => handleExpand(!expanded)}
      >
        <Col xs={10} lg={11}>
          <div className="team-content col-11 col-md-10 col-sm-8 align-items-center">
            <div className="team-img">
              <img src={process.env.PUBLIC_URL + `/media/${id}.png`} alt="" />
            </div>
            <div className="team-name">
                <div className="fs-4 fw-semibold">
                {teamInfo.name}
                </div>
                <div className="fs-5">
                {record.wins}-{record.losses}-{record.ot}
                </div>
            </div>
          </div>
        </Col>
        <Col xs={2} lg={1}>
          <div className="team-button col-1 col-md-2 col-sm-4">
            {expanded ? (
              <ChevronUpIcon
                className="fade-in-fwd"
                size={"medium"}
              ></ChevronUpIcon>
            ) : (
              <ChevronDownIcon
                className="fade-in-fwd"
                size={"medium"}
              ></ChevronDownIcon>
            )}
          </div>
        </Col>
      </Row>

      <Collapse in={expanded}>
        <div>
          <Stack id={`roster-${id}`} gap={0}>
            {roster &&
              roster.map((player) => (
                <Player key={player.apiId} info={player}></Player>
              ))}
          </Stack>
        </div>
      </Collapse>

      {/* <div className="roster hidden" id={`roster-${id}`}>
        
      </div> */}
    </div>
  );
}
