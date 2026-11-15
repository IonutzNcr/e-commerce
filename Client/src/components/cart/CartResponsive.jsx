import React from 'react'
import { BsCartFill } from 'react-icons/bs';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const CartResponsive = () => {

    const { cart, cart2 } = useContext(AuthContext);
    const cartTotalPrice = cart ? cart.reduce((total, item) => total + parseFloat(item.article.price), 0) : 0;

    return (
        <details className="dropdown font-bold">
            <summary className="btn btn-secondary">
                <div className='hover:text-black flex gap-2 items-center'>
                    <BsCartFill className='text-2xl' />
                    {
                        cart
                            ?
                            <p className='text-2xl relative top-[1px]'>
                                {cart.length}
                            </p>
                            :
                            false
                    }
                </div>
            </summary>

            <ul className="p-3 shadow menu dropdown-content w-fit z-[1] bg-base-100 rounded-b-3xl flex gap-2">
                {
                    cart && cart.length > 0 &&
                    cart.map((item, index) => {
                        return (
                            <li key={index}>
                                <p className="titleBreak2 w-[200px] text-sm flex text-primary justify-between gap-3 items-center text-start">{item.article.title}
                                    <span className='text-warning noTitleBreak'>{item.article.price + "€"}</span>
                                </p>
                            </li>
                        )
                    })
                }
                {
                    cart && cart.length > 0 &&
                    <li className='flex items-center justify-center bg-secondary rounded-3xl w-full'>
                        <div className='w-full text-black text-center flex items-center justify-center'>
                            Total : {cartTotalPrice}€
                        </div>
                    </li>
                }
            </ul>
        </details >
    )
}

export default CartResponsive