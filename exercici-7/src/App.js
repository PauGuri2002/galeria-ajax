import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Game from './components/Game';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/search/:query" component={SearchResults} />
        <Route path="/game/:id" component={Game} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
