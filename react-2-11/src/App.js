import './App.css';
import data from './data.json';
import NewsCard from './newsCard';

function App() {
  return (
    <div className="App">
      <Header />
      <main class="card-container">
        {data.map((item) => {
          return (
            <NewsCard data={item} />
          )
        })}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header class="py-8">
      <h1 class="text-h1 font-bold text-center">Actualitat CITM</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer class="bg-blue-500 h-24 flex flex-col justify-center absolute left-0 bottom-0 w-full">
      <div class="text-center text-white">CITM 2023</div>
    </footer>
  );
}

export default App;
