import React from 'react';
import { Link } from 'react-router-dom';

function SubTemplate(Sub) {
    const data = Sub.data
    // console.log(Sub.data);
    return (
        <div id='CARD' className="card bg-base-100 shadow-md m-3 mb-10 transition-all duration-300 hover:scale-90 hover:bg-primary-content">
            <h2 className="card-title">{data.name}</h2>
            <div className="card-actions justify-center mt-3 p-5">
                <Link to={`/subcategorie/${data.name}`} className="btn btn-primary">Voir tout</Link>
            </div>
        </div>
    )
}

export default SubTemplate;