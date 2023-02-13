import './App.css';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {

    const [schedule, setSchedule] = useState();

    useEffect(() => {
        // console.log("useEffect");
        fetchSchedule();
    },[])

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
            <Header></Header>
            <div className='body'>
                {schedule && schedule.map((game) => 
                    <Game key={game.gamePk} homeTeam={game.teams.home} awayTeam={game.teams.away} date={game.gameDate}></Game>)}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;
