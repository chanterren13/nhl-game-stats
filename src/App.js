import logo from './logo.svg';
import './App.css';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
        <Header></Header>
        <div className='body'>
            <Game></Game>
        </div>
        <Footer></Footer>
    </div>
  );
}

export default App;
