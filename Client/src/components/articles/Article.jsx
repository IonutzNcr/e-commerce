import React from 'react';
import { useEffect, useState } from 'react';
import {
    Outlet,
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";


export default function Article() {
    let { id } = useParams();
    const [data, setResponse] = useState([]);

    useEffect(
        () => {
            fetch(`http://127.0.0.1:8000/api/articles/${id}`)
                .then((response) => response.json())
                .then((data) => setResponse(data))
        },
        []);
    console.log(id)
    console.log(data);
    return (<ul>
        <div key={data.id} id={data.id} className="card bg-base-100 shadow-md m-3 mb-10 transition-all duration-300 hover:scale-90 hover:bg-primary-content">
            <figure><img src={data.image} alt="cardimage" /></figure>
            <div className="card-body">
                <Link to={`/Listdatas/` + data.id}>link</Link>
                <h2 className="card-title">{data.title}</h2>
                <p>{data.price}$</p>
                <div className="card-actions justify-center mt-3">
                    <button className="btn btn-primary">Voir tout</button>
                </div>
            </div>
        </div>
    </ul>);
}