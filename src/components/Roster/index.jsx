import React from 'react';
import Player from '../Player';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Roster.css';

export default function Roster({ teamLink }) {

    const [roster, setRoster] = useState();

    useEffect(() => {
        const fetchRoster = () => {
            const config = {
                method: 'get',
                url: `https://statsapi.web.nhl.com${teamLink}/roster`,
                headers: { }
              };
    
            axios(config)
            .then((response) => {
                let data = response.data;
                console.log(data.roster);
                setRoster(data.roster);
            })
            .catch((err) => {
                console.log(err);
            })
        };

        fetchRoster();
    },[teamLink])

    const filterPlayers = (player) => {
        if (player.position.code === "G") {
            return ""
        } else {
            return <Player key={player.person.id} person={player.person}></Player>
        }
    }

    return (
        <div className='roster'>
            {roster && roster.map((player) => filterPlayers(player))}
        </div>
    );
}