import React, { useCallback } from 'react';
import './Player.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Player({ person, position }){

    const [stats, setStats] = useState();

    const fetchPlayer = useCallback(() => {
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
            // console.log(config.url)
            if (data.stats[0].splits[0].stat) {
                setStats(data.stats[0].splits[0].stat);
            } else {
                setStats(null);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [person.link]);

    useEffect(() => {
        // console.log("useEffect");
        fetchPlayer();
    }, [person.link, fetchPlayer]);

    // Needs time to fetch then render
    if (stats) {
        return (
            <div className='player-content player-content-sm'>
                <div className='player-col'>
                    <h4>{person.fullName} - {position}</h4>
                </div>
                <div className='player-col'>
                    <h4>
                        <span className='stat'>G: {stats.goals}</span>
                        <span className='stat'>A: {stats.assists}</span>
                        <span className='stat'>P: {stats.points}</span>
                        <span className='stat'>SH%: {stats.shotPct}</span>  
                    </h4>
                </div>
            </div>
        );
    } else {
        return (
            <div className='player-content'>Loading Player</div>
        );
    }
}