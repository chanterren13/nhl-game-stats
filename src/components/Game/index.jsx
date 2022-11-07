import React from 'react';
import './Game.css';
import Team from '../Team';

export default function Game() {
    return (
        <div>
            <h3>Game</h3>
            <div className='team-box'>
                <Team></Team>
                <Team></Team>
            </div>
        </div>
    );
}