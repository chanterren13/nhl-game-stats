import React from 'react';
import './Player.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Player({person}){

    const [stats, setStats] = useState();

    useEffect(() => {
        // console.log("useEffect");
        fetchPlayer();
    }, [person.link])

    const fetchPlayer = () => {
        let config = {
            method: 'get',
            url: `https://statsapi.web.nhl.com${person.link}/stats?stats=statsSingleSeason&season=20222023`,
            headers: { 
              'Content-Type': 'application/json'
            }
          };

        axios(config)
        .then((response) => {
            let data = response.data;
            console.log(config.url)
            if (data.stats[0].splits[0].stat) {
                setStats(data.stats[0].splits[0].stat);
            } else {
                setStats(null);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };

    // Needs time to fetch then render
    if (stats) {
        return (
            <div className='player-content'>
                <div className='player-col'>
                    <h4>{person.fullName}</h4>
                </div>
                <div className='player-col'>
                    <h4>
                        <span className='stat'>Goals: {stats.goals}</span>
                        <span className='stat'>Assists: {stats.assists}</span>
                        <span className='stat'>Points: {stats.points}</span> 
                    </h4>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}