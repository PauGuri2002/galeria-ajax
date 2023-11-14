import { Link } from 'react-router-dom';
import data from '../data.json'

export default function Characters() {
    return (
        <div className="characters">
            <h1>Choose a character</h1>
            <ul>
                {data.map(character => {
                    return (
                        <li>
                            <Link key={character.id} to={`/characters/${character.id}`}>{character.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}