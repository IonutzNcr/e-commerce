import React, { useContext, useEffect, useState } from 'react'
import { SortingContext } from '../Context/SortingContext';
import { BsCircleFill } from 'react-icons/bs';
import { BiSolidChevronDownCircle, BiSolidChevronUpCircle } from 'react-icons/bi';


export const Tribar = ({ event, state }) => {

    const { sorted, setSorted } = useContext(SortingContext)



    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/categories").then(res => res.json()).then(data => setCategories(data))
    }, [])


    const handleSorting = (evt) => {
        if (sorted.name === null || sorted.name === "desc") {
            setSorted({ ...sorted, name: "asc" })
        } else {
            setSorted({ ...sorted, name: "desc" })
        }
    }

    const handleCategories = (evt) => {
        if (sorted.categories !== evt.target.value) {
            setSorted({ ...sorted, categorie: evt.target.value })
        }
    }

    return (
        <div className='flex flex-row items-center justify-center gap-5 w-full bg-gradient-to-r from-green-900 to-blue-900 p-5'>


            <div className='flex flex-row items-center gap-5 p-5 bg-register rounded-xl shadow-md h-full'>
                <p className='text-white text-sm font-bold italic'>Trier par :</p>
                <div className="relative">
                    <select
                        className="block w-full text-black appearance-none p-2 rounded focus:outline-none btn btn-secondary transition-all duration-200"
                        name="categorie"
                        onChange={handleCategories}
                        value={sorted.categorie}
                    >
                        <option value="all">Tout</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    </div>
                </div>
                <div className="relative group">
                    <button
                        onClick={handleSorting}
                        name="name"
                        className="btn-secondary btn text-black px-4 py-2 rounded shadow focus:outline-none transition"
                    >
                        Nom
                        {!sorted.name ? 
                            <span className="text-xs ml-2 flex justify-center items-center gap-2">
                                <BsCircleFill />
                            </span>

                        :
                            sorted.name === "asc"
                                ?
                                <span className="ml-2 text-2xl flex justify-center items-center gap-2">
                                    <BiSolidChevronUpCircle />
                                </span>
                                :
                                <span className="ml-2 text-2xl flex justify-center items-center gap-2">
                                    <BiSolidChevronDownCircle />
                                </span>
                        }
                    </button>
                </div>
            </div>

        </div >
    )
}
