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
        <div id="game-details">
            <div id="game-banner" style={{ backgroundImage: 'url(' + game.background_image + ')', }}>
                <div id="game-banner-overlay"></div>
                <h1>{game.name}</h1>
            </div>
            <div id="game-info">
                <div id="game-desc" className="text-lg">
                    {game.description_raw}
                </div>
                <div id="game-tags">
                    {game.tags.map(tag => <span key={tag.id} className="tag">{tag.name}</span>)}
                </div>
            </div>
        </div>
    )
}