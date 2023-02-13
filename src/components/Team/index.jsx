import React, { useCallback, useEffect } from 'react';
import './Team.css';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
// import Roster from '../Roster';
import axios from 'axios';
import Player from '../Player';

export default function Team({ record, teamInfo }) {

    const [expanded, setExpanded] = useState(false);
    const [roster, setRoster] = useState();
    const [id, setId] = useState();

    const fetchRoster = useCallback(() => {
        const config = {
            method: 'get',
            url: `https://statsapi.web.nhl.com${teamInfo.link}/roster`,
            headers: { }
        };

        // try {
        //     const res = await axios(config);
        //     setRoster(res.data.roster);
        // } catch (e) {
        //     console.log(e);
        // }

        axios(config)
        .then((res) => {
            setRoster(res.data.roster);
        })
        .catch((e) => console.log(e));
        
    }, [teamInfo.link]);

    useEffect(() => {
        fetchRoster();
        setId(teamInfo.id.toString());
    }, [teamInfo.link, teamInfo.id, fetchRoster]);

    const filterPlayers = (player) => {
        if (player.position.code === "G") {
            return ""
        } else {
            return <Player key={player.person.id} person={player.person} position={player.position.abbreviation}></Player>
        }
    };

    const handleExpand = (expand) => {
        setExpanded(expand);
        document.getElementById(`roster-${id}`).classList.toggle("hidden");
    };

    return (
        <div className='team team-sm'>
            <div className='team-section row align-items-center'>
                <div className='team-content col-11 col-md-10 col-sm-7'>
                    <div className='team-img'>
                        <img src={`media/${id}.png`} alt=""/>
                    </div>
                    <div className='team-name'>
                        <h3>{teamInfo.name}</h3>
                        <h4>{record.wins}-{record.losses}-{record.ot}</h4>
                    </div>
                </div>
                <div className='team-button col-1 col-md-2 col-sm-5' onClick={() => handleExpand(!expanded)}>
                    {expanded ? 
                    <ChevronUpIcon className='fade-in-fwd' size={"medium"}></ChevronUpIcon> 
                    : <ChevronDownIcon className='fade-in-fwd' size={"medium"}></ChevronDownIcon>
                    } 
                </div>
            </div>
            
            <div className='roster hidden' id={`roster-${id}`}>
                {roster && roster.map((player) => filterPlayers(player))}
            </div>
        </div>
    );
}