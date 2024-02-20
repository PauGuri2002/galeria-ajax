import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate, fetchAPI } from '../helpers';

export default function Details() {
    const { eventId } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetchAPI("?where=id_evento%3D" + eventId)
            .then(response => response.json())
            .then(data => {
                if (data.results != null && data.results.length > 0) {
                    setDetails(data.results[0]);
                }
            })
    }, [eventId]);

    if (!details) return (<></>);

    return (
        <div className="details">
            <h1>{details.titulo}</h1>
            <p className="details-theme">{details.tematica}</p>
            <img src={details.imagen_evento} alt={details.titulo} />
            <p dangerouslySetInnerHTML={{ __html: details.descripcion }}></p>
            <div className="details-meta">
                <p><strong>Cuando:</strong><br />{formatDate(details.fecha_inicio)} {details.hora_inicio}</p>
                <p><strong>Dónde:</strong><br />
                    {details.lugar_celebracion}<br />
                    {details.calle}<br />
                    {details.cp} {details.nombre_localidad}<br />
                    {details.nombre_provincia}
                </p>
                <a href={details.enlace_contenido} target="_blank" rel="noreferrer">Más información</a>
            </div>
        </div>
    );
}