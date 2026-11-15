import React, { useState, useEffect } from 'react'

import Navbar from './Navbars/Navbar'
import NavbarCategories from './Navbars/NavbarCategories'
import Footer from './Footer'
import ArticleFullTemplate from './articles/ArticleFullTemplate'
import { useParams } from 'react-router-dom'

export const PageOneArticle = () => {
    const [data, setData] = useState(null);
    let {id} = useParams();

    

    useEffect(
        () => {
            // console.log(id);
            fetch(`http://127.0.0.1:8000/api/articles/${id}`)
                .then((rip) => {
                    
                    return rip.json()
                })
                .then((res) => {
                    
                    setData(res)
                    console.log("response" + res)
                }).catch(err => console.log("this err is", err))
        },
        []);

    return (
        <div className="bg-base-200 w-full h-full flex-col flex items-center overflow-x-hidden">

            <Navbar />

            <div className="divider"></div>

            <NavbarCategories />

            <div className="divider"></div>

            <ArticleFullTemplate article={data} />

            <Footer />

        </div>
    )
}
