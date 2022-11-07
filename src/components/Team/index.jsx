import React from 'react';
import './Team.css';
import { useState } from 'react';

export default function Team({name, record}) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className='team'>
            <h3>{name}</h3>
            <h4>{record.wins}-{record.losses}-{record.otLosses}</h4>
            <button onClick={() => setExpanded(!expanded)}>Expand</button>
            {expanded && 
                <div>
                    Roster
                </div>
            }
        </div>
    );
}