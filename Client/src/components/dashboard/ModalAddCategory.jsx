import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';


export default function ModalAddCategory({event}) {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'spec',
    });
    const [Category, setCategory] = useState([]);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const onSubmit = data => { 
        const specs = data.spec.map(element => {
            return '{"key": "' + element.fieldName + '", "value": "' + element.value + '"}';
        }).join(',');
        let newData = {
            name:data.name,
            categories_id: data.category
        }
        fetch("http://127.0.0.1:8000/api/subcategories", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newData)
        }).then(d => {
            console.log(d)  
            return d.json()
        }).then(d => {
            console.log(d)
            event(false);
            navigate("/dashboard");
        }).catch(err => console.log('error: ', err))
    };

    console.log(errors);

    function reset() {
        setInput("");
    }

    useEffect (() => {
        fetch("http://127.0.0.1:8000/api/categories")
        .then((response) => response.json())
        .then((data) =>{
            console.log(data)
            setCategory(data)})
    }, []);

    return (
        <div className="modal-overlay overflow-y-scroll h-screen" onClick={() => event(false)}>
            <div className="modal-content h-full" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-base-200 w-full flex flex-col items-center justify-center pt-0 p-5 rounded-3xl'>
                    <div onClick={() => event(null)} className='w-full p-5 pr-0 flex items-center justify-end'>
                        <button className='btn btn-ghost'>
                            <MdClose className='text-3xl' />
                        </button>
                    </div>
                    <h2>Creer une nouvelle sous-catégorie</h2>
                    <div className='flex mds:flex-col items-center justify-center'>
                        <div className='flex-col flex gap-10 py-10'>
                            <GetCategory />
                            <input type="text" placeholder="nom" {...register("name", { required: true })} />
                        </div>
                    </div>
                    <input className='btn btn-outline btn-success w-fit' type="submit" />
                </form>
            </div>
        </div>
    );

    function GetCategory (){
        return (
            <select {...register("category", { required: true })}>
                <option default disabled>Choisir une categorie</option>
                {Category.map((sub, index) =>
                    <option key={index} value={sub.id}>{sub.name}</option>
                )}
            </select>
        );
    };
}