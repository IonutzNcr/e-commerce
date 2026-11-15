import React, { useContext, useEffect, useState } from 'react';
import { SortingContext } from './Context/SortingContext';
import ArticleTemplate from './articles/ArticleTemplate';
import { ImPriceTag } from 'react-icons/im';


function ListCommandes() {
    // const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const [commandes, setCommandes] = useState([]);
    // const { sorted, setSorted } = useContext(SortingContext);


    useEffect(() => {
        let user_id = JSON.parse(localStorage.getItem('user')).id;
        let url = 'http://localhost:8000/api/getOrders/' + user_id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.orders)
                setCommandes(data.orders)
            });
    }, []);

    

    return (
        <div className="bg-gray-100 p-4">
            {commandes.map((commande, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <p className="text-xl text-black font-semibold">Commande n°{commande.id}sqdsqjdeezr23234</p>
                    <p className="text-sm text-gray-600">ETAT: {commande.etat}</p>
                    <ul className="mt-2">
                        {commande.crypt.map((article, articleIndex) => (
                            <li key={articleIndex} className="flex justify-between items-center py-1">
                                <img src={article.article.image} className="w-16 h-16" alt={article.article.title} />
                                <p className="text-sm text-black">{article.article.title}</p>
                                <p className="text-sm text-black font-semibold">${article.article.price  }</p>
                                <p className="text-sm text-black text-red-600 font-semibold">${article.article.price - article.article.price * article.article.promo / 100 }</p>
                                
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default ListCommandes;
