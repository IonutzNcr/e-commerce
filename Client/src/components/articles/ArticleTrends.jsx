import React, {useEffect, useState } from 'react';

const Article = ({ article }) => {

    const [variations, setVariations] = useState(null)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/variation/${article.id}`)
            .then(response => response.json())
            .then(data => {
            setVariations(data);
            // console.log(data);   
            // console.log(data.variation);
            })
            .catch(error => {
            console.error(error);
            });
    },[])

    return (
        <div id='CARD' className="card bg-base-100 shadow-md m-3 mb-10 duration-300 hover:scale-90 hover:bg-primary-content transition-transform">
            <figure><img src={variations?.variation[0].image} alt="4060ti Nvidia RTX" /></figure>
            <div className="card-body">
                <h2 className="card-title overflow-x-scroll">{article?.title}</h2>
                {/* <p className="text-justify text-xl">{Article?.description}</p> */}
                <div className="card-actions mt-3 flex items-center p-1 justify-center">

                    <p className='text-2xl italic'>
                        {variations?.variation[0].price}€
                    </p>
                    <a href={`/article/${article?.id}`}>
                        <button className="btn btn-primary">Acheter</button>
                    </a>
                    <div>
                        {variations?.variation[0].stock > 0

                            ?

                            <p className='text-green-500 w-full min-w-[100px] mt-5'>En stock : {variations?.variation[0].stock} articles</p>

                            :

                            <p className='text-red-500 w-full min-w-[100px] mt-5'>Rupture de stock</p>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article