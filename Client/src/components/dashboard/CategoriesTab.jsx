import React from 'react';
import { useEffect, useState } from 'react';
import ModalAddCategory from './ModalAddCategory';
import { IoIosAddCircle } from 'react-icons/io';
import { RxUpdate } from 'react-icons/rx';
import { AiTwotoneDelete } from 'react-icons/ai';

const CategoriesTab = ({active, activeModal, setActive, setId, id}) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='p-5 justify-center items-center flex m-5 w-fit'>
                <button className='btn btn-success btn-outline flex' onClick={() => activeModal("add")}>
                    <IoIosAddCircle className='text-3xl' />
                    <p>
                        New SubCategory
                    </p>
                </button>
            </div>
            {active === "add" && <ModalAddCategory event={setActive} />}
        </div>
    );
}

export default CategoriesTab
