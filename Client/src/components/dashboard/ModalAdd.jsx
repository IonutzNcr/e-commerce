import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';


export default function ModalAdd({event,id}) {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'spec',
    });
    const [subCategory, setSubCategory] = useState([]);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    id =(id[0]);
    let article_id = id['id'];
    article_id = article_id+1;
    // console.log(article_id);

    const onSubmit = data => {
        const specs = data.spec.map(element => {
            return '{"key": "' + element.fieldName + '", "value": "' + element.value + '"}';
        }).join(',');
        let newArticleData = {
            title:data.titre,
            description:data.description,
            subcategories_id: data.subcategory
        }
        let newVariationData = {
            article_id:article_id,
            title:"base",
            description:data.description,
            price:data.prix,
            image:data.image,
            spec: '[' + specs + ']',
            stock: data.stock,
            poid: data.poids
        }
        fetch("http://127.0.0.1:8000/api/articles", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newArticleData)
        }).then(d => {
            console.log(d)
            return d.json()
        }).catch(err => console.log('error: ', err))

        fetch("http://127.0.0.1:8000/api/variation",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newVariationData)
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
        fetch("http://127.0.0.1:8000/api/subcategories")
        .then((response) => response.json())
        .then((data) =>{
            console.log(data)
            setSubCategory(data)})
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
                    <h2>Creer un nouvelle article</h2>
                    <div className='flex mds:flex-col items-center justify-center'>
                        <div className='flex-col flex gap-10 py-10'>
                            <GetSubCategory />
                            <input type="text" placeholder="stock"{...register("stock", { required: true })} />
                            <input type="text" placeholder="titre" {...register("titre", { required: true })} />
                            <input type="text" placeholder="prix" {...register("prix", { required: true })} />
                            <input type="text" placeholder="image" {...register("image", {})} />
                            <input type="text" placeholder="Poids" {...register("poids", {})} />
                            <h2>Ajouter des carateristique</h2>
                            <input value={input} onInput={(e) => setInput(e.target.value)}/>
                            <button onClick={() => { input && append({ fieldName: input }); reset(); }}>Ajouter</button>
                            <ul>
                                {fields.map((spec, index) => (
                                    <li key={index}>
                                        <h3>{spec.fieldName}</h3>
                                        <input
                                            type="text"
                                            {...register(`spec.${index}.value`,
                                            {required: true})}
                                        />
                                    <button onClick={() => remove(index)}>
                                        Supprimer
                                    </button>
                                    </li>
                                ))}
                            </ul>
                            <textarea className='textarea textarea-primary' placeholder='Description...' {...register("description", { required: true })} />
                        </div>
                    </div>
                    <input className='btn btn-outline btn-success w-fit' type="submit" />
                </form>
            </div>
        </div>
    );

    function GetSubCategory (){
        return (
            <select {...register("subcategory", { required: true })}>
                <option default disabled>Choisir une sous-categorie</option>
                {subCategory.map((sub, index) =>
                    <option key={index} value={sub.id}>{sub.name}</option>
                )}
            </select>
        )

    }
}