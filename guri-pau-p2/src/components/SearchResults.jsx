import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { fetchAPI } from "../helpers";

export default function SearchResults() {
    const { searchQuery } = useParams();
    const [results, setResults] = useState(null);

    useEffect(() => {
        fetchAPI("?where=search(titulo%2C%20%22" + searchQuery + "%22)")
            .then(response => response.json())
            .then(data => {
                if (data.results != null && data.results.length > 0) {
                    setResults(data.results);
                } else {
                    setResults([]);
                }
            })
    }, [searchQuery]);

    if (results === null) return (<></>);
    if (results.length === 0) return (<h2>No se han encontrado resultados</h2>);

    return (
        <div className="search-results">
            <h2>Se han encontrado {results.length} {results.length === 1 ? 'evento' : 'eventos'}</h2>
            <div className="list">
                {results.map((item, index) => (
                    <Card key={index} data={item} />
                ))}
            </div>
        </div>
    );
}