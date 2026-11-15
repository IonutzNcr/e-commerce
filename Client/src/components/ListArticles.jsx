import React, { useContext } from 'react';
import { SortingContext } from './Context/SortingContext';
import ArticleTemplate from './articles/ArticleTemplate';
import { ImPriceTag } from 'react-icons/im';

function ListArticles() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const { sorted, setSorted } = useContext(SortingContext);

    const filterByCategory = articles.filter(article => {
        if (sorted.categorie === "all") {
            return article;
        }
        return article.subcategory.category.name === sorted.categorie;
    });

    const filterByName = filterByCategory.sort((a, b) => {
        if (sorted.name === "asc") {
            return a.title.localeCompare(b.title);
        }
        if (sorted.name === "desc") {
            return b.title.localeCompare(a.title);
        }
    });

    return (
        <div className='flex-grow flex flex-wrap items-center justify-center bg-gradient-to-r from-green-900 to-blue-900 w-full flex-col'>
            <h1 className='text-4xl font-bold text-primary text-center p-5 flex justify-center gap-5 items-center w-full'>
                <ImPriceTag className='text-3xl text-primary' />
                <p>
                    ARTICLES
                </p>
            </h1>
            <div className='flex flex-wrap justify-center items-center w-full'>
                {filterByName.map((article) =>
                    <ArticleTemplate key={article.id} article={article} />
                )}
            </div>
        </div>
    );
}

export default ListArticles;
