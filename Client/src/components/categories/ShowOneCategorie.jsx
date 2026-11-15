import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SubTemplate from "./SubTemplate";

export default function ShowOneCategories() {
    let { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [subCategories, setsubCategories] = useState([]);

    useEffect(() => { //gerer l'erreur 404 si l'id n'existe pas
        fetch(`http://127.0.0.1:8000/api/categories/${id}`)
            .then((response) => response.json())
            .then((data) => (
                setsubCategories(data.subcategory),
                setCategories(data),
                console.log(data.subcategory)))
    }, []);
    return (
        <div className='p-5 flex-grow bg-gradient-to-r from-green-900 to-blue-900 w-full flex flex-col '>
                <h2 className='text-4xl w-full text-center'>{categories.name}</h2>
                    <div className='flex flex-wrap justify-center items-center h-full'>
                        {subCategories.map((subCategorie) => (
                            <div>
                                <SubTemplate key={subCategorie.id} data={subCategorie} />
                            </div>
                        ))}
                    </div>
        </div>
    );
}
