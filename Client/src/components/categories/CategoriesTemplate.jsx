import React from "react";
import { Link } from "react-router-dom";

function CategoriesTemplate(categorie) {

    const data = categorie.categorie;

    return (
        <div id='CARD' className="card bg-base-100 shadow-md m-3 mb-10 transition-all duration-300 hover:scale-90 hover:bg-primary-content">
            <figure>
                <img src={data.image} />
            </figure>
            <div className="card-body flex flex-col items-center justify-center p-0 pt-5">
                <h2 className="card-title">{data.name}</h2>
            </div>
            <div className="card-actions justify-center mt-3 p-5">
                <Link to={`/categorie/${data.id}`} className="btn btn-primary">Voir plus</Link>
            </div>
        </div>
    )
};

export default CategoriesTemplate;