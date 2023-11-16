import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    function handleOnChange(event) {
        setQuery(event.target.value);
    }

    return (
        <div>
            <input type="text" placeholder="SEARCH" onChange={handleOnChange} id="search-input" />
            <Link to={`/search/${query}`}><button>SEARCH</button></Link>
        </div>
    )
}