import React from 'react';
import Player from '../Player';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Roster.css';

export default function Roster() {

    const [roster, setRoster] = useState();

    useEffect(() =>{
        fetchRoster();
    },[])

    const fetchRoster = () => {
        const config = {
            method: 'get',
            url: 'https://statsapi.web.nhl.com/api/v1/teams/10/roster',
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

    const filterPlayers = (player) => {
        if (player.position.code === "G") {
            return ""
        } else {
            return <Player key={player.person.id} person={player.person}></Player>
        }
    }

    return (
        <div className='roster'>
            <button onClick={() => fetchRoster()}>Fetch Roster</button>
            {roster && roster.map((player) => filterPlayers(player))}
        </div>
    );
}