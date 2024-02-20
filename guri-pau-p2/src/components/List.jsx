import { useEffect, useState } from "react";
import Card from "./Card";
import { fetchAPI } from "../helpers";

export default function List() {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchAPI("?limit=20")
            .then((response) => response.json())
            .then((data) => {
                setList(data.results);
            });
    }, []);

    if (!list) return (<h1>Loading...</h1>);

    return (
        <div className="list">
            {list.map((item, index) => (
                <Card key={index} data={item} />
            ))}
        </div>
    );
}