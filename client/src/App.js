import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { useEffect, useState, useLayoutEffect, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import ScrollButton from "./components/ScrollButton";
import { PinPlayerContext } from "./contexts/PinPlayerContext";
import Player from "./components/Player";

const App = () => {
  const [schedule, setSchedule] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const pinnedPlayer = useContext(PinPlayerContext);

  useEffect(() => {
    fetchSchedule();
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 60) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchSchedule = () => {
    // console.log(`${process.env.REACT_APP_SERVER_DOMAIN}/schedules`);
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_SERVER_DOMAIN}/schedules`,
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    };

    axios(config)
      .then((response) => {
        setSchedule(response.data);
      })
      .catch((err) => {
        console.log(err);
        setSchedule([]);
      });
  };

  return (
    <div className="text-light">
      <Header></Header>
      <Container className="mt-3">
        {pinnedPlayer.player && (
          <div className="pin-section">
            <Player info={pinnedPlayer.player} pinned={true}></Player>
          </div>
        )}
        {schedule.length > 0 ? (schedule.map((game) => (
            <Game
              key={game.id}
              homeTeam={game.home}
              awayTeam={game.away}
              date={game.date}
            ></Game>
          ))) : (
            <div style={{textAlign: "center"}}>
                <h1>No Games Today :(</h1>
            </div>
          )
          }
        <Footer></Footer>
      </Container>
      {showButton && <ScrollButton></ScrollButton>}
    </div>
  );
};

export default App;
