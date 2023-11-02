import logo from './logo.svg';
import './App.css';
import data from './data.json';
import NewsCard from './newsCard';

function App() {
  return (
    <div className="App">
      <Header />
      {data.map((item) => {
        return (
          <NewsCard data={item} />
        )
      })}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Header</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <h1>Footer</h1>
    </footer>
  );
}

export default App;
