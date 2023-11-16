import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function GameCard({ id, name, releaseDate }) {

    let releaseYear = releaseDate ? releaseDate.split('-')[0] : '????';

    return (
        <Link to={`/game/${id}`}>
            <li className="game-card">
                <div className="card-header">
                    <h2 className="title">{name}</h2>
                    <div className="release-date">{releaseYear}</div>
                </div>
            </li>
        </Link>
    )
}