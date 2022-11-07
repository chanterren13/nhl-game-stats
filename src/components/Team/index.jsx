import React from 'react';
import './Team.css';
import { useState } from 'react';

export default function Team() {

    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <h3>Team Name 1</h3>
            <h4>W-L-OTL</h4>
            <button onClick={() => setExpanded(!expanded)}>Expand</button>
            {expanded && 
                <div>
                    Roster
                </div>
            }
        </div>
    );
}