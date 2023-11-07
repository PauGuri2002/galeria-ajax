export default function NewsCard(props) {
    return (
        <div className="card">
            <img src={props.data.imagen} className="card-img" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.data.titulo}</h5>
                <p className="card-text">{props.data.description}</p>
                <a href={props.data.link} target="_blank" rel="noreferrer" className="btn-primary">Llegeix més</a>
            </div>
        </div>
    )
}