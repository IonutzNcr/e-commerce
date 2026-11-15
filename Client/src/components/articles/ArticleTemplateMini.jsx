import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ArticleTemplateMini = ({ article }) => {

    const navigate = useNavigate();

    const goToArticle = (id) => {
        navigate(`/article/${id}`)
    }

    return (
        <div className="card-ionut">
            <figure className='absolute-ionut'>
                <img src={article.variation[0].image} alt="une image" />
            </figure>
            <div className="card-body-ionut">
                <div className="info-ionut">
                    <h2 className="card-title-ionut">{article.title}</h2>
                    <p>{article.variation[0].price} €</p>
                </div>
                <button onClick={() => goToArticle(article.id)} className="btn btn-primary btn-ionut">Voir plus</button>
                
            </div>
        </div>


    )
}

export default ArticleTemplateMini