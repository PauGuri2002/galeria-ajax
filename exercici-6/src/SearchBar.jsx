import { useState } from "react";

export default function SearchBar({ setQuery }) {

    const [placeholder, setPlaceholder] = useState("CLICK TO SEARCH");

    function handleOnChange(event) {
        setQuery(event.target.value);
    }

    function handleFocus() {
        setPlaceholder("TYPE TO SEARCH");
    }

    function handleBlur() {
        setPlaceholder("CLICK TO SEARCH");
    }

    return (
        <div>
            <input type="text" placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} onChange={handleOnChange} id="search-input" />
        </div>
    )
}