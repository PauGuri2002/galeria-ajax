import { useRef } from "react";
import { useHistory } from "react-router-dom";

export default function Search() {
    const input = useRef(null);
    const history = useHistory();

    function performSearch(event) {
        event.preventDefault();
        const query = input.current.value;
        if (query === "") {
            return;
        }
        history.push("/busqueda/" + query);
    }

    return (
        <div className="search">
            <h1>Buscador</h1>
            <div className="search-form">
                <input type="text" ref={input} placeholder="Escribe algo para buscar" />
                <button onClick={performSearch}>Buscar</button>
            </div>
        </div>
    );
}