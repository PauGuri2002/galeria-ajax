import { useEffect, useState } from "react";
import GameCard from "./GameCard";

const apiKey = '85b0f5e9c40241aeaaad41c8899ddc66';

export default function GameList({ searchQuery }) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        let url = `https://api.rawg.io/api/games?key=${apiKey}`;
        if (searchQuery) {
            url += `&search=${searchQuery}&search_precise=true`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGames(data.results);
            })
    }, [searchQuery]);

    return (
        <ul id="game-list">
            {games.map(game => <GameCard key={game.id} id={game.id} name={game.name} releaseDate={game.released} />)}
        </ul>
    )
}