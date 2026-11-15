import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ArticleTemplateMini from './articles/ArticleTemplateMini'; //ajouté
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [modal, setModal] = useState(false);
    const [researchTerm, setResearchTerm] = useState("");
    const [data, setResponse] = useState([]);
    let research = useRef("");
    const categories = JSON.parse(localStorage.getItem('categories'));

    //utilisé pour enlever le modal quand on clique ailleurs
    const modalRef = useRef(null)
    const navigate = useNavigate();

    useEffect(() => {
        setSearchTerm('');
        setModal(false);
    },[window.location.pathname])

    useEffect(()=>{
        console.log(modalRef);
        document.addEventListener("click",(event)=>{
            if(modalRef.current && !modalRef.current.contains(event.target)){
                setModal(false);
            }
        });
        document.addEventListener("scroll",(event)=>{
            // console.log("okuuuduqsudqs");
            setModal(false);
        });
    },[])


    //ajouté
    async function fetcher() {
        fetch("http://127.0.0.1:8000/api/variation")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setResponse(data)
            })
    }

    const filterByCategory = data.filter ( article =>{
        if (selectedCategory === "all") {
            return article
        }
       
        if( article.subcategory.category.id === +selectedCategory){
            return article;
        }
    }) 

    const filterBySearch = filterByCategory.filter(article => {

        if (article.title.toLowerCase().includes(research.current.toLowerCase())) {
            return article;
        }
    })


    //logic for searchbar ici
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm === '') {
            console.log("nammmssss")
            navigate(`/search/all/${selectedCategory}`)
        } else {
            navigate(`/search/${searchTerm}/${selectedCategory}`)
        }
    }

    return (
        <>
            <div ref={modalRef} className="flex bg-register shadow-md rounded-xl overflow-hidden items-center justify-center">
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

                <div className="select-container p-4 bg-primary text-primary-content outline-none w-fit rounded-r-xl">
                    <select
                        className="bg-primary text-primary-content outline-none"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option className='text-center' disabled >Choisi une Categorie</option>
                        <option className='text-center' value='all' >Tout</option>
                        {categories.map((category) => {
                            return <option className='text-center' key={category.id} value={category.id}>{category.name}</option>
                        }
                        )}

                    </select>

                </div>
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
            </div>
        </>
    );
};

export default SearchBar;
