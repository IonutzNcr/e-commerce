import React, { useEffect, useState } from 'react';
import ArticleTemplate from './articles/ArticleTemplate';
import { useParams } from 'react-router-dom';

function ListArticlesReserched() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('articles')) || []);
    const { search, category_id } = useParams();

    useEffect(() => {
        if (!data.length) {
            fetch("http://127.0.0.1:8000/api/articles")
                .then((response) => response.json())
                .then((fetchedData) => {
                    console.log(fetchedData);
                    setData(fetchedData);
                    localStorage.setItem('articles', JSON.stringify(fetchedData));
                });
        }
    }, [data]);

    const filterByCategory = data.filter(article => {
        if (category_id === "all") {
            return article;
        }
        return article.subcategory.category.id === +category_id;
    });

    const filterBySearch = filterByCategory.filter(article => {
        if (search === "all") {
            return article;
        }
        return article.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className='flex flex-wrap items-center justify-center bg-gradient-to-r from-green-900 to-blue-900 w-full h-screen'>
            {
                filterBySearch.length > 0
                    ? filterBySearch.map((article) => <ArticleTemplate key={article.id} article={article} />)
                    : <p className='text-4xl text-center text-white'>Aucun article ne correspond à votre recherche</p>
            }
        </div>
    );
}

export default ListArticlesReserched;
