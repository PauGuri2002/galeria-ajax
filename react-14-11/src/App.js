import './App.css';
import {
  Link,
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Characters from './components/Characters';
import Character from './components/Character';

function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/characters">Characters</Link></li>
        </ul>

        <Route path="/" exact component={Home} />
        <Route path="/characters" component={Characters} />
        <Route path="/characters/:character_id" component={Character} />

      </Router>
    </div>
  );
}

export default App;
