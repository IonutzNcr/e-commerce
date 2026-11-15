import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const CartFixed = () => {
    const { cart, cart2, totalArticles2, setTotalArticles2, setCart2 } = useContext(AuthContext);
    const [cart2TotalPrice, setCart2TotalPrice] = useState(0);

    useEffect(() => {
        const newTotal = cart2 ? cart2.reduce((total, item) => total + parseFloat(item.article.variation[0].price) * item.quantity, 0) : 0;
        setCart2TotalPrice(newTotal);
    }, [cart2]);

    const addOneItem = (article) => {
        const existingItem2 = cart2.find(item => item.article.id === article.id) || null;

        if (existingItem2 == null) {
            const newItem = { article: article, quantity: 1 };
            setTotalArticles2(prev => prev + 1);
            setCart2(prev => [...prev, newItem]);
        } else {
            existingItem2.quantity++;
            setTotalArticles2(prev => prev + 1);
            setCart2([...cart2]);
            localStorage.setItem('cart2', JSON.stringify(cart2));
        }
    };

    const removeOneItem = (article) => {
        const existingItem2 = cart2.find(item => item.article.id === article.id) || null;

        if (existingItem2 != null && existingItem2.quantity > 1) {
            existingItem2.quantity--;
            setTotalArticles2(prev => prev - 1);
            setCart2([...cart2]);
            localStorage.setItem('cart2', JSON.stringify(cart2));
        }
    };

    return (
        <div className='p-5 bg-gradient-to-r from-green-900 to-blue-900 flex flex-col gap-5 flex-grow items-center justify-center'>
            <div className='bg-register max-w-[550px] p-5 rounded-3xl'>
                <div className='flex gap-5 items-center justify-center'>
                    <p className='text-2xl text-success'>Nombre d'articles :</p>
                    <p className='text-white text-4xl'>{totalArticles2}</p>
                </div>
            </div>

            <div className='bg-register max-w-[600px] p-5 rounded-3xl'>
                {
                    (!cart && !cart2)
                        ? <p className='text-white text-2xl'>Votre panier est vide</p>
                        : (!cart && cart2?.length > 0) ?
                            <div className='flex flex-col gap-5'>
                                {
                                    cart2.map((item, index) => {
                                        return (
                                            <div key={index} className='flex justify-between items-center gap-5'>
                                                <AiOutlineMinusCircle
                                                    onClick={() => removeOneItem(item.article)}
                                                    className='text-secondary text-6xl hover:scale-150 transition-all duration-200 active:scale-100' />
                                                <AiOutlinePlusCircle
                                                    onClick={() => addOneItem(item.article)}
                                                    className='text-primary text-6xl hover:scale-150 transition-all duration-200 active:scale-100' />
                                                <img width="50px" src={item.article.variation[0].image} alt={item.article.title} />
                                                <p className='text-white text-xl overflow-x-scroll w-full'>{item.article.title}</p>
                                                <p className='text-white text-xl'>{item.article.variation.price}</p>
                                                <p className='text-warning text-xl'>x{item.quantity}</p>
                                            </div>
                                        );
                                    })
                                }

                                <div className="divider"></div>

                                <div className='flex justify-between items-center px-1'>
                                    <p className='text-2xl'>Total :</p>
                                    <p className='text-3xl text-warning'>
                                        {cart2TotalPrice.toFixed(2)} €
                                    </p>
                                </div>
                            </div>
                            :
                            <div className='flex flex-col gap-5'>
                                Votre panier est vide
                            </div>

                }

            </div>

            {
                (!cart && !cart2)
                    ? <div className='btn btn-primary btn-outline'>Valider mon panier</div>
                    :
                    // Bouton pour revenir à la page d'accueil
                    <a href="/" className='btn btn-primary btn-outline'>Retour à la page d'accueil</a>
            }

        </div>
    );
};

export default CartFixed;
