import React, { useEffect, useState } from 'react'
import { 
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';


function PaymentForm(user) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/payment_confirm?session_id={CHECKOUT_SESSION_ID}',
      },
    });

    if(error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('Payment successfull');
    }

    setIsLoading(false);
  }

  const linkOptions = email 
    ? {
      defaultValues: {
        email: email,
      },
    }
  : {};

  useEffect(() => {
    if(user.userEmail === null) {
      setEmail(null);
      console.log('\nemail null');
    } else {
      const email = user.userEmail.email;
      setEmail(email);
      console.log('\nemail find')
    }
  }, []);

  return (
    <div className='flex-grow flex flex-wrap items-center justify-center bg-gradient-to-r from-green-900 to-blue-900 w-full flex-col'>
      <div className='card w-96 bg-neutral shadow-xl'>
        <p className='card-title text-center'>Payment</p>
        <form className='p-5 card-body' id='payment-form' onSubmit={handleSubmit}>
          <LinkAuthenticationElement
            options={linkOptions}
          />
          <PaymentElement id='payment-element' />
          <button type="submit" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>        </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}

export default PaymentForm;
