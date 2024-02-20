import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <div className='header-links'>
                <Link to="/">Inicio</Link>
                <Link to="/busqueda">Buscar</Link>
            </div>
        </header>
    )
}