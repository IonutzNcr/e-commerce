import React, {useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const ArticleTemplate = ({ article }) => {

    const [variations, setVariations] = useState(null)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/variation/${article.id}`)
            .then(response => response.json())
            .then(data => {
            setVariations(data);
            })
            .catch(error => {
            console.error(error);
            });
    },[])

    const navigate = useNavigate();

    const goToArticle = (id) => {
        navigate(`/article/${id}`)
    }

    return (
        <div id='CARD' className="card bg-base-100 shadow-md m-10 duration-300 hover:scale-90 hover:bg-primary-content transition-transform">
            <figure><img src={variations?.variation[0].image} alt="article" /></figure>
            <div className="card-body flex flex-col">
                <h2 className="card-title truncate w-21 overflow-x-scroll">{article.title}</h2>
                <p>{article.short_description}</p>
                <div className="card-actions mt-3 flex items-center">
                    <p className='italic text-3xl'>{variations?.variation[0].price}€</p>
                    <button onClick={() => goToArticle(article.id)} className="btn btn-primary">Voir plus</button>
                </div>

                <div className='flex flex-col justify-center items-center mt-5'>
                    {variations?.variation[0].stock
                        ?
                        <div className='flex gap-5'>
                            <div className="badge badge-outline badge-success">En stock</div>
                            {
                                variations?.variation[0].stock > 1
                                    ?
                            <div className="badge badge-outline badge-primary">{variations?.variation[0].stock} articles</div>
                                    :
                            <div className="badge badge-outline badge-primary">{variations?.variation[0].stock} article</div>
                            }
                        </div>
                        : 
                        <div className="badge badge-outline badge-error">Rupture de stock</div>
                    }
                </div>
            </div>

        </div >
    )
}

export default ArticleTemplate