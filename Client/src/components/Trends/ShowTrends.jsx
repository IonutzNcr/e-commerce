import { useEffect, useState, React } from 'react';
import ArticleTrends from '../articles/ArticleTrends';
import { AiOutlineFire } from 'react-icons/ai';

const ShowArticles = () => {

    const [popularArticles, setPopularArticles] = useState([])

    const show_3_popular_articles = () => {
        fetch('http://127.0.0.1:8000/api/articles/popular_3')
            .then(response => response.text())
            .then(text => {
                const data = JSON.parse(text);
                setPopularArticles(data);
            })
            .catch(error => {
                console.error(error);
            });

            return popularArticles;
    }

    useEffect(() => {
        show_3_popular_articles();
    }, []);

    return (

        <div className="flex flex-col items-center justify-around transition-all duration-200 w-full bg-base-200">

            <p className="text-4xl font-bold text-center text-primary flex items-center justify-center p-10">
                <AiOutlineFire className="text-4xl mr-5" />
                TENDANCES
            </p>

            <div className="flex flex-wrap justify-center gap-20 items-center overflow-auto p-y-5 transition-transform duration-200">
               {popularArticles.map((article)=>
                    <ArticleTrends key={article.id} article={article} />
                )}
            </div>


            <a className='p-5 flex justify-center items-center bg-transparent mb-10'>
                <button className='btn btn-primary btn-outline'>Toutes les tendances</button>
            </a>

        </div>
    )
}

export default ShowArticles;