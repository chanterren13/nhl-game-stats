import React from 'react'

export default function Player({name, goals, assists, points}){
    return (
        <div>
            <h5>{name}</h5>
            <h6>Goals: {goals} Assists: {assists} Points: {points}</h6>
        </div>
    );
}