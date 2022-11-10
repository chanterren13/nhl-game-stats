import React from 'react';
import './Game.css';
import Team from '../Team';

export default function Game({homeTeam, awayTeam}) {
    return (
        <div>
            <div className='team-box'>
                <Team teamInfo={homeTeam.team} record={homeTeam.leagueRecord}></Team> VS
                <Team teamInfo={awayTeam.team} record={awayTeam.leagueRecord}></Team>
            </div>
        </div>
    );
}