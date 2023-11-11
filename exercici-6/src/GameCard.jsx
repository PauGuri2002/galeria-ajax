export default function GameCard({ name, image, releaseDate }) {

    let releaseYear = releaseDate ? releaseDate.split('-')[0] : '????';

    return (
        <li className="game-card">
            <div className="card-header">
                <h2 className="title">{name}</h2>
                <div className="release-date">{releaseYear}</div>
            </div>
        </li>
    )
}