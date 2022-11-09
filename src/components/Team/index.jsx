import React from 'react';
import './Team.css';
import { useState } from 'react';
import { ChevronDownIcon } from '@primer/octicons-react';

export default function Team({name, record}) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className='team'>
            <div className='team-content'>
                <div className='team-name'>
                    <h3>{name}</h3>
                    <h4>{record.wins}-{record.losses}-{record.otLosses}</h4>
                </div>
                <div className='team-button'>
                    <button onClick={() => setExpanded(!expanded)}>
                        <ChevronDownIcon size={"medium"}></ChevronDownIcon>
                    </button>
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