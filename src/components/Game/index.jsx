import React from 'react';
import './Game.css';
import Team from '../Team';

export default function Game() {
    const record = {wins:"W", losses:"L", otLosses:"OTL"}
    return (
        <div>
            <h3>Game</h3>
            <div className='team-box'>
                <Team name={"Team Name 1"} record={record}></Team>
                <Team name={"Team Name 2"} record={record}></Team>
            </div>
        </div>
    );
}