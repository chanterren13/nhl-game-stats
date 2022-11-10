import React from 'react';
import './Game.css';
import Team from '../Team';

export default function Game({homeTeam, awayTeam}) {
    return (
        <div>
            <div className='team-box'>
                <Team></Team>
                <Team></Team>
            </div>
        </div>
    );
}