import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../Context/AuthContext';

import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "./PaymentForm";

function Payment(props) {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState('');

  const { cart } = useContext(AuthContext);
  const cartTotalPrice = cart ? cart.reduce((total, item) => total + parseFloat(item.article.price), 0) : 0;
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // const price = (parseInt(cartTotalPrice) * 100);
    const price = 4000;
    if(user === null) {
      fetch("http://127.0.0.1:8000/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          price: price
        }),
      })
      .then(res => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret));
    } else {
      fetch("http://127.0.0.1:8000/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          price: price,
          stripe_id: user.customers_id,
        }),
      })
      .then(res => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret));
    }
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} userEmail={user}/>
        </Elements>
      )}
    </>
  );
}

export default Payment;