import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';


export default function ModalUpdate({ event, article }) {
    console.log(article);
    const specString = article.variation[0].spec;
    const specList = JSON.parse(specString)
    const [spec] = useState(specList);
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        defaultValues: {
            titre: article.title,
            description: article.variation[0].description,
            short_description: article.short_description,
            prix: article.variation[0].price,
            image: article.variation[0].image,
            stock: article.variation[0].stock,
            highlight: article.highlight
        }
    });
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'spec',
    });
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data.description)
        const specs = data.spec.map(element => {
            return '{"key": "' + element.fieldName + '", "value": "' + element.value + '"}';
        }).join(',');
        let newArticleData = {
            title: data.titre,
            description: data.description,
            short_description: data.short,
            highlight: data.highlight
        }
        let newVariationData = {
            price: data.prix,
            image: data.image,
            stock: data.stock,
            spec: '[' + specs + ']',
        }
        fetch(`http://127.0.0.1:8000/api/articles/update/${article.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newArticleData)
        }).then(d => {
            console.log(d)
            return d.json()
        })
            .then(d => {
                console.log(d)
                // event(false);
                // navigate("/dashboard");

            }).catch(err => console.log('error: ', err))
        
        fetch(`http://127.0.0.1:8000/api/variation/update/${article.variation[0].id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newVariationData)
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

    function reset() {
        setInput("");
    }

    const [input, setInput] = useState("");
    console.log(errors);

    useEffect(() => {
        replace(spec);
    }, []);

    return (
        <div className="modal-overlay h-screen overflow-y-scroll" onClick={() => event(false)}>
            <div className="modal-content h-full" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col shadow-lg gap-10 rounded-2xl xs:max-w-[330px] bg-base-200 items-center justify-center'>
                    <div onClick={() => event(null)} className='w-full flex items-center justify-end p-5'>
                        <button className='btn btn-ghost'>
                            <MdClose className='text-3xl' />
                        </button>
                    </div>
                    <h2>Creer un nouvelle article</h2>
                    <div className='flex mds:flex-col items-center justify-center'>
                        <div className='flex-col flex gap-10'>
                            <input type="text" placeholder="titre"  {...register("titre", { required: true })} />
                            <input type="text" placeholder="prix"  {...register("prix", { required: true })} />
                            <input type="text" placeholder="stock"{...register("stock", { required: true })} />
                            <input type="text" placeholder="image"  {...register("image", {})} />
                            <h2>Modifier des carateristique</h2>
                            <input value={input} onInput={(e) => setInput(e.target.value)}/>
                            <button onClick={() => { input && append({ fieldName: input }); reset(); }}>Ajouter</button>
                            <ul>
                                {fields.map((spec, index) => 
                                console.log(spec) ||
                                (
                                    <li key={index}>
                                        <h3>{spec.fieldName || spec.key}</h3>
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
                            <textarea className='textarea textarea-primary' placeholder='Short Description...' {...register("short", { required: true })} />
                            <textarea className='textarea textarea-primary' placeholder='Description...' {...register("description", { required: true })} />
                            <div>
                                <div>highlight</div>
                                <select {...register("highlight", { required: true })}>
                                    <option value="1">Oui</option>
                                    <option value="2">Non</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex-col flex gap-10'>  
                        </div>
                    </div>
                    <input className='btn btn-outline btn-success w-fit' type="submit" />
                </form>
            </div>
        </div>
    );
}
