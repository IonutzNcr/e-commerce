import React, { useEffect, useState } from 'react'
import { BsCartFill } from 'react-icons/bs';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

const PagePanier = () => {
    const [TTC, setTTC] = useState(0);
    const { cart } = useContext(AuthContext);
    const cartTotalPrice = cart ? cart.reduce((total, item) => total + parseFloat(item.article.price), 0) : 0;

    useEffect(()=>{
        let user_id = JSON.parse(localStorage.getItem('user')).id;
        console.log(user_id);

        fetch('http://localhost:8000/api/shipping',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                adress_id: 2,
                mode: "express"
            })
        }).then((response) => response.json())
        .then((data) => {
            let total = 200 + +data
            setTTC(total)
            console.log(total)
        })
            
    },[])

    const order = () => {
        let user_id = JSON.parse(localStorage.getItem('user')).id;
        fetch('http://localhost:8000/api/saveOrder',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: user_id
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
    }

            

    return (


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
                <li className='flex items-center justify-center bg-white rounded-3xl w-full mt-2 gap-3 '>
                    <div className='w-full text-black text-center flex items-center justify-center'>
                        Total : {cartTotalPrice}€ HT
                    </div>
                    <div onClick = {order} className='w-full text-black text-center flex items-center justify-center bg-purple-200 hover:bg-purple-500 '>
                        Total : {Math.round(TTC)}€ TTC ( {Math.round(TTC - 200)}  euros de frais de port  )
                    </div>
                </li>
            }
        </ul>

    )
}

export default PagePanier


/*
 Route::post('/shipping', [ShippingController::class, 'getFees']);
 */