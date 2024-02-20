import { Link } from 'react-router-dom';
import { formatDate } from '../helpers';

export default function Card({ data }) {

    if (!data) return (<></>);

    return (
        <Link to={"/evento/" + data.id_evento} className="card">
            <img src={data.imagen_evento} alt={data.titulo} />
            <div className="card-content">
                <div className='card-title'>
                    <h3>{data.titulo}</h3>
                    <p className='card-theme'>{data.tematica}</p>
                </div>
                <div className="card-meta">
                    <p>Cuando: {formatDate(data.fecha_inicio)}</p>
                    <p>Dónde: {data.lugar_celebracion}</p>
                </div>
            </div>
        </Link>
    );
}