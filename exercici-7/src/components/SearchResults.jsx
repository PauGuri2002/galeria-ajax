import GameList from "./GameList";

export default function SearchResults({ match }) {
    return (
        <GameList searchQuery={match.params.query} />
    )
}