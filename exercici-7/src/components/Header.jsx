import { Link } from "react-router-dom/cjs/react-router-dom.min"
import SearchBar from "./SearchBar"

export default function Header() {
    return (
        <header>
            <h1 id="page-title">
                <Link to="/">
                    RAWG <span className="font-normal">Games Search</span>
                </Link>
            </h1>
            <SearchBar />
        </header>
    )
}