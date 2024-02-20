import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import './style/App.css';
import List from './components/List';
import Details from './components/Details';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={List} />
        <Route path="/evento/:eventId" exact component={Details} />
        <Route path="/busqueda" component={Search} />
        <Route path="/busqueda/:searchQuery" exact component={SearchResults} />
      </BrowserRouter>
    </div>
  );
}

export default App;
