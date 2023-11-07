export default function NewsCard({ data }) {
    return (
        <div className="card">
            <div className="card-body">
                <img src={data.imagen} className="card-img" alt="..." />
                <h5 className="card-title">{data.titulo}</h5>
                <p className="card-text">{data.description}</p>
            </div>
            <a href={data.link} target="_blank" rel="noreferrer" className="btn-primary">Llegeix més</a>
        </div>
    )
}