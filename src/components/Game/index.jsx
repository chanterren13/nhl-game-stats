import React from 'react';
import './Game.css';
import Team from '../Team';

export default function Game({homeTeam, awayTeam}) {
    return (
        <div>
            <div className='team-box'>
                <Team name={"Team Name 1"} record={record}></Team>
                <Team name={"Team Name 2"} record={record}></Team>
            </div>
        </div>
    );
}