import data from '../data.json';

export default function Character({ match, location }) {
    let character = data.find(character => character.id === parseInt(match.params.character_id));

    return (
        <div>
            <h1>{character.name}</h1>
            <p>Race: {character.race}</p>
            <p>Age: {character.age}</p>
            <p>First appeared in: {character.first_appearance}</p>
        </div>
    )
}