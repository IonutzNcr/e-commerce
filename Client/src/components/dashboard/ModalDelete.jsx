import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


export default function ModalDelete({ event, article }) {
    const { handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = () => {
        fetch(`http://127.0.0.1:8000/api/articles/${article.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(d => {
            console.log(d)
            return d.json()
        })
            .then(d => {
                console.log(d)
                event(false);
                navigate("/dashboard");

            }).catch(err => console.log('error: ', err))
    };

    const onNotSubmit = () => {
        event(false);

    }

    return (
        <div className='w-[100vw] p-5 flex flex-col items-center justify-center bg-gradient-to-r from-green-900 to-blue-900'>
            <div className="modal-overlay" onClick={() => event(false)}>
                <div className="modal-content flex flex-col justify-center items-center" onClick={(e) => e.stopPropagation()}>
                    <div onSubmit={handleSubmit(onSubmit)} className='flex flex-col shadow-lg gap-5 p-7 rounded-2xl xs:max-w-[300px] bg-base-300 items-center justify-center'>
                        <p className='text-center'>Êtes-vous sûr de vouloir suprimer cet article ?</p>
                        <button className='btn p-2 w-[80px] hover:border-none rounded-3xl hover:bg-green-400 transition-all duration-200 hover:text-black' onClick={onSubmit}>Oui</button>
                        <button className='btn p-2 w-[80px] hover:border-none rounded-3xl hover:bg-red-400 transition-all duration-200 hover:text-black' onClick={onNotSubmit}>Non</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

