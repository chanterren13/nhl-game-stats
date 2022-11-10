import React from 'react';
import './Team.css';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import Roster from '../Roster';

export default function Team({ record, teamInfo }) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className='team'>
            <div className='team-content'>
                <div className='team-name'>
                    <h3>{teamInfo.name}</h3>
                    <h4>{record.wins}-{record.losses}-{record.ot}</h4>
                </div>
                <div className='team-button' onClick={() => setExpanded(!expanded)}>
                    {expanded ? 
                    <ChevronUpIcon className='fade-in-fwd' size={"medium"}></ChevronUpIcon> 
                    : <ChevronDownIcon className='fade-in-fwd' size={"medium"}></ChevronDownIcon>
                    } 
                </div>
            </div>
            
            {expanded && 
                <div>
                    <Roster></Roster>
                </div>
            }
        </div>
    );
}