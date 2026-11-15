import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';


import ArticleTemplate from './articles/ArticleTemplate';
import ArticleTemplateMini from './articles/ArticleTemplateMini';

export const Tester = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [researchTerm, setResearchTerm] = useState("");
    const [data, setResponse] = useState([]);

    let research = useRef("");

    const filterBySearch = data.filter(article => {

        if (article.title.toLowerCase().includes(research.current.toLowerCase())) {
            return article;
        }

    })

    async function fetcher() {
        fetch("http://127.0.0.1:8000/api/articles")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setResponse(data)
            })
    }


    //logic for searchbar ici
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm === '') {
            console.log("nammmssss")
            // navigate(`/search/all/${selectedCategory}`)
        } else {
            // navigate(`/search/${searchTerm}/${selectedCategory}`)
        }


    }
    return (
        <>
            <form onSubmit={handleSearch} className='flex row'>
                <div className="p-4 xs:hidden">
                    <AiOutlineSearch className='text-2xl transition-all duration-200 text-primary hover:scale-125 active:scale-100' />
                </div>
                <input
                    type="text"
                    placeholder="Rechercher"
                    value={searchTerm}
                    onChange={async (e) => {
                        research.current = e.target.value;
                        if (research.current.length === 0) {
                            setModal(false);
                        }
                        setSearchTerm(e.target.value)
                        if (e.target.value.length % 3 === 0 && e.target.value.length !== 0) {

                            console.log("ici research", research.current)
                            console.log("ici c'est la terre")
                            setResearchTerm(research.current);
                            await fetcher();
                            setModal(true);

                        }
                    }}
                    className="w-full md-min:min-w-[300px] p-4 outline-none bg-register"
                />
            </form>
            {
                modal && (
                    <div className="modal-tester">
                        {filterBySearch.map((article) => {
                            return <ArticleTemplateMini key={article.id} article={article} />
                        })}

                        {filterBySearch.length === 0 && <p className='message_error'>Not result found</p>}
                    </div>
                )
            }

        </>
    )
}
