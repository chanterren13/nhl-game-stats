import React, { useCallback, useEffect } from "react";
import "./Team.css";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@primer/octicons-react";
// import Roster from '../Roster';
import axios from "axios";
import Player from "../Player";

export default function Team({ record, teamInfo }) {
  const [expanded, setExpanded] = useState(false);
  const [roster, setRoster] = useState();
  const [id, setId] = useState();

  const fetchRoster = useCallback(() => {
    const config = {
      method: "get",
      url: `https://statsapi.web.nhl.com${teamInfo.link}/roster`,
      headers: {},
    };

    axios(config)
      .then((res) => {
        const cleanRoster = res.data.roster.filter((player) => {
          return player.position.code !== "G";
        });
        cleanRoster.sort((a, b) =>
          a.person.fullName > b.person.fullName
            ? 1
            : b.person.fullName > a.person.fullName
            ? -1
            : 0
        );
        setRoster(cleanRoster);
      })
      .catch((e) => console.log(e));
  }, [teamInfo.link]);

  useEffect(() => {
    fetchRoster();
    setId(teamInfo.id.toString());
  }, [teamInfo.link, teamInfo.id, fetchRoster]);

  const handleExpand = (expand) => {
    setExpanded(expand);
    document.getElementById(`roster-${id}`).classList.toggle("hidden");
  };

  return (
    <div className="team team-sm">
      <div
        className="team-section row align-items-center"
        onClick={() => handleExpand(!expanded)}
      >
        <div className="team-content col-11 col-md-10 col-sm-8">
          <div className="team-img">
            <img src={`media/${id}.png`} alt="" />
          </div>
          <div className="team-name">
            <h3>{teamInfo.name}</h3>
            <h4>
              {record.wins}-{record.losses}-{record.ot}
            </h4>
          </div>
        </div>
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
      </div>

      <div className="roster hidden" id={`roster-${id}`}>
        {roster &&
          roster.map((player) => (
            <Player
              key={player.person.id}
              person={player.person}
              position={player.position.abbreviation}
            ></Player>
          ))}
      </div>
    </div>
  );
}
