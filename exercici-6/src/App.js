import './App.css';
import GameList from './GameList.jsx';
import SearchBar from './SearchBar';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <SearchBar setQuery={setQuery} />
      <GameList searchQuery={query} />
    </div>
  );
}

export default App;
