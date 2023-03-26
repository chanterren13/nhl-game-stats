import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { useEffect, useState, useLayoutEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import ScrollButton from "./components/ScrollButton";

function App() {
  const [schedule, setSchedule] = useState();
  const [showButton, setShowButton] = useState(false);

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
      }
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSchedule = () => {
    let config = {
      method: "get",
      url: "http://localhost:5000/schedules",
      headers: {},
    };

    axios(config)
      .then((response) => {
        setSchedule(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-dark text-light">
      <Header></Header>
      <Container className="mt-3">
        {schedule &&
          schedule.map((game) => (
            <Game
              key={game.id}
              homeTeam={game.home}
              awayTeam={game.away}
              date={game.date}
            ></Game>
          ))}
        <Footer></Footer>
      </Container>
      {showButton && <ScrollButton></ScrollButton>}
    </div>
  );
}

export default App;
