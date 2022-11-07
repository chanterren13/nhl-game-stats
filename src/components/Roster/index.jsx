import React from 'react'
import Player from '../Player';

export default function Roster() {

    const players = [
        {
            name: "Bob Smith",
            goals: "2",
            assists: "3",
            points: "5"
        },
        {
            name: "Joe Smith",
            goals: "1",
            assists: "3",
            points: "4"
        },
        {
            name: "Mike Smith",
            goals: "2",
            assists: "6",
            points: "8"
        },
    ]

    return (
        <div>
            {players.map((player) =>
             <Player name={player.name} goals={player.goals} assists={player.assists} points={player.points}></Player>)}
        </div>
    );
}