import React from 'react';
import './Player.css';

export default function Player({name, goals, assists, points}){
    return (
        <div>
            <h4>{name}</h4>
            <h5>
                <span className='stat'>Goals: {goals}</span>
                <span className='stat'>Assists: {assists}</span>
                <span className='stat'>Points: {points}</span> 
            </h5>
        </div>
    );
}