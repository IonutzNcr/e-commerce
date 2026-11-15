import React from 'react'
import { Link } from 'react-router-dom'

const ArticleFullTemplate = ({ article }) => {
    return (
        <>
            {article && (<div className="card w-96 h-[400px] m-5 bg-base-100 shadow-xl image-full">
                <figure><img src={article.image} alt="article" /></figure>
                <div className="text-sm breadcrumbs">
                <ul>
                <li><Link to={`/categorie/${article.subcategory.categories_id}`}>{article.subcategory.category.name}</Link></li> 
                <li><Link to={`/subcategorie/${article.subcategories_id}`}>{article.subcategory.name}</Link></li> 
                <li>{article.title}</li>
                </ul>
                </div>
                <div className="card-body flex  ">
                    <h2 className="card-title">{article.title}</h2>
                    <div>
                        {article.description}
                        <div className='italic mt-5 list-disc'>
                            {/* {console.log((JSON.parse(article.spec)))} */}
                            {JSON.parse(article.spec).map((caracteristique) => <ArticleSpec caracteristique ={caracteristique}/> )}
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <p>{article.price + "€"}</p>
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}



export default ArticleFullTemplate

// {Object.keys(data.tasks).map((date) => {
//     const dayTasks = tasks[date];
//     return Object.keys(dayTasks).map((key) => {
//         const task = dayTasks[key];
//         return (
//           <li>{task.name}</li>
//         )