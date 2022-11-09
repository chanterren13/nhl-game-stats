import React from 'react';
import './Team.css';
import { useState } from 'react';

export default function Team({name, record}) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className='team'>
            <div className='content'>
                <div>
                    <h3>{name}</h3>
                    <h4>{record.wins}-{record.losses}-{record.otLosses}</h4>
                </div>
                <div>
                    <button onClick={() => setExpanded(!expanded)}>Expand</button>
                </div>
            </div>
            
            {expanded && 
                <div>
                    Roster
                </div>
            }
        </div>
    );
}