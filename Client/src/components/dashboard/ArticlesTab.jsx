import React from 'react';
import { useEffect, useState } from 'react';
import ModalAdd from './ModalAdd';
import ModalUpdate from './ModalUpdate';
import ModalDelete from './ModalDelete';
import { IoIosAddCircle } from 'react-icons/io';
import { RxUpdate } from 'react-icons/rx';
import { AiTwotoneDelete } from 'react-icons/ai';

const ArticlesTab = ({ active, activeModal, setActive, setId, id }) => {

    const [articles, setArticles] = useState([]);
    const [lastArticlesId, setLastArticlesId] = useState();

    useEffect(
        () => {
            fetch("http://127.0.0.1:8000/api/variation")
                .then((response) => response.json())
                .then((data) => {
                    setArticles(data)
                    let temp = data.slice(-1)
                    setLastArticlesId(temp);
                })
        },
        [active]);

    return (
        <div className='flex flex-col justify-center items-center'>

            <div className='p-5 justify-center items-center flex m-5 w-fit'>
                <button className='btn btn-success btn-outline flex' onClick={() => activeModal("add")}>
                    <IoIosAddCircle className='text-3xl' />
                    <p>
                        New Article
                    </p>
                </button>
            </div>

            <div className='flex flex-wrap justify-center items-center'>
                {articles.map((article, index) => (
                    <div key={article.id} className='w-[300px] border border-base-200 bg-register m-5 text-center rounded-3xl hover:bg-slate-900 hover:scale-105 flex flex-col p-5 items-center gap-5 justify-center transition-all duration-200'>
                        <div><button className='btn btn-primary btn-outline' onClick={() => {
                            setId(index);
                            activeModal("update")
                        }}>
                            <RxUpdate className='text-2xl' />
                            <p>
                                UPDATE
                            </p>
                        </button></div>
                        <div><button className='btn btn-error btn-outline' onClick={() => {
                            setId(index);
                            activeModal("delete")
                        }}>
                            <AiTwotoneDelete className='text-2xl' />
                            <p>
                                DELETE
                            </p>
                        </button></div>
                        <p>ARTICLE ID : <span className='text-2xl text-green-500'>{article.id}</span></p>
                        <p>ARTICLE TITLE : <span className='text-xl text-green-500 flex-wrap break-all flex whitespace-normal items-center justify-center pt-2'>{article.title}</span></p>
                    </div>
                ))}
            </div>

            {active === "add" && <ModalAdd event={setActive} id={lastArticlesId} />}
            {active === "update" && <ModalUpdate event={setActive} article={articles[id]} />}
            {active === "delete" && <ModalDelete event={setActive} article={articles[id]} />}
            
        </div>
    );
}

export default ArticlesTab
