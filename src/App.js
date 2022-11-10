import './App.css';
import Game from './components/Game';
import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {

    const [schedule, setSchedule] = useState();

    useEffect(() => {
        fetchSchedule();
    })

    const fetchSchedule = () => {
        let config = {
            method: 'get',
            url: 'https://statsapi.web.nhl.com/api/v1/schedule',
            headers: { }
        };

        axios(config)
        .then((response) => {
            let data = response.data;
            //console.log(data.dates[0].games);
            setSchedule(data.dates[0].games);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <div>
            <h1>NHL Game Stats</h1>
            {schedule && schedule.map((game) => 
            <Game key={game.gamePk} homeTeam={game.teams.home} awayTeam={game.teams.away}></Game>)}
        </div>
    );
}

export default App;
