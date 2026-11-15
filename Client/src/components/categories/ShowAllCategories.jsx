import React from "react";
import CategoriesTemplate from "./CategoriesTemplate";
import { BiCategoryAlt } from "react-icons/bi";

export default function ShowAllCategories() {
    const categorie = JSON.parse(localStorage.getItem('categories'));
    return (
        <div className="flex flex-col items-center h-full justify-around bg-gradient-to-r from-green-900 to-blue-900 w-full">

            <p className="text-4xl font-bold text-center text-primary flex items-center justify-center p-10">
                <BiCategoryAlt className="text-4xl mr-5" />
                CATÉGORIES
            </p>

            <div className="h-full w-full flex flex-wrap justify-center gap-20 items-center overflow-auto p-y-5">
                {
                    categorie?.map((categorie) =>
                    <CategoriesTemplate key={categorie.id} categorie={categorie} />
                )}
            </div>


            <a href="/categorie/1" className='p-5 flex justify-center items-center bg-transparent mb-10'>
                <button className='btn btn-primary btn-outline'>Toutes les sous-catégories</button>
            </a>

        </div>
    );
}
