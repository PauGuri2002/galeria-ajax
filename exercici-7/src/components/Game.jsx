import { useEffect } from "react";
import { useState } from "react";

const apiKey = '85b0f5e9c40241aeaaad41c8899ddc66';

export default function Game({ match }) {
    const [game, setGame] = useState({});

    let id = match.params.id;

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGame(data);
            })
    }, [id]);

    if (!game.name) return;

    return (
        <div>
            <h1>Game {game.name}</h1>
        </div>
    )
}