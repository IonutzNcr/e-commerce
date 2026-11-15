import React, { useState } from 'react'
import { 

} from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';


function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className='flex-grow flex flex-wrap items-center justify-center bg-gradient-to-r from-green-900 to-blue-900 w-full flex-col'>
      <div className='card w-96 bg-neutral shadow-xl'>
        <p className='card-title text-center'>Payment </p>
      </div>
    </div>
  )
}

export default PaymentForm;
