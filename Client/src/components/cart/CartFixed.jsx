import React, { useEffect } from 'react'
import { BsCartFill } from 'react-icons/bs';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const CartFixed = () => {

    const { cart, totalArticles, totalArticles2, cart2 } = useContext(AuthContext);
    const cartTotalPrice = cart ? cart.reduce((total, item) => total + parseFloat(item.article.price), 0) : 0;
    const totalOfArticles = totalArticles + totalArticles2;

    return (
        <div className={totalArticles > 0 || totalArticles2 > 0 ? "dropdown dropdown-end dropdown-hover rounded-2xl dropdown-top font-bold ss+:hidden fixed bottom-5 right-5" : "dropdown dropdown-end rounded-2xl dropdown-top font-bold ss+:hidden fixed bottom-5 right-5"}>
            <label className="btn btn-secondary flex flex-col w-fit h-fit p-2">

                <div className='flex gap-2'>
                    <BsCartFill className='text-4xl' />
                    {
                                    <p className='text-4xl'>
                                        {totalOfArticles}
                                    </p>
                    }
                </div>

                <p className='text-xs'>Mon panier</p>
            </label>

            <ul className="p-3 shadow menu dropdown-content z-[1] bg-base-100 rounded-t-3xl rounded-bl-3xl flex justify-between">
                {
                    cart && cart.length > 0 &&
                    cart.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="w-full text-sm flex text-primary justify-between text-start">
                                    <div className='flex gap-3'>
                                        <img src={item.article.image} alt="article" width="20px" />
                                        <div>
                                            {item.article.title}
                                        </div>

                                    </div>
                                    <span className='text-warning noTitleBreak ml-10'>{item.article.price + "€"}</span>
                                </div>
                            </li>
                        )
                    }
                    )
                }

                {
                    cart && cart.length > 0 &&
                    <li className='flex items-center justify-center bg-secondary rounded-3xl w-full mt-2'>
                        <div className='w-full text-black text-center flex items-center justify-center'>
                            Total : {cartTotalPrice}€
                        </div>
                    </li>
                }
            </ul>
        </div>


    )
}

export default CartFixed
