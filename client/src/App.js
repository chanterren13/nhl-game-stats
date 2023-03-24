import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";

function App() {
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    // console.log("useEffect");
    fetchSchedule();
  }, []);

  const fetchSchedule = () => {
    let config = {
      method: "get",
      //   url: "https://statsapi.web.nhl.com/api/v1/schedule",
      url: "http://localhost:5000/schedules",
      headers: {},
    };

    axios(config)
      .then((response) => {
        // console.log(response.data);
        setSchedule(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-dark text-light">
      <Header></Header>
      <Container>
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
    </div>
  );
}

export default App;
