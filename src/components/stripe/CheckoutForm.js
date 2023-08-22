import '../../stripe.css';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router';

export default function CheckoutForm({data}) {
  const history = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  console.log('checkoutform: ', data)
  console.log('productID?: ', data.cart_contents[0].product_id)
  
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product_id = {product_id: data.cart_contents[0].product_id};
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    
    await stripe.confirmPayment({
      elements,
      confirmParams: { 
        // return_url: history('/completion', {state: {data: data}})
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: 'if_required',
    }
    ).then((result) => {
        fetch(process.env.REACT_APP_SERVER_URL + '/createorder', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
    })
        .then(fetch(process.env.REACT_APP_SERVER_URL + '/deleteCart', {
          method: 'DELETE',
          body: JSON.stringify(product_id),
          headers: {
            'Content-type': 'application/json'
          },
          credentials: 'include'
        }))
        // .then(response => {if(!response.ok) alert('please manually remove contents of cart prior to making another order.')}))
        .then(response => response.json())
        .then(response => {
          return history('/completion', {state: {data: data}})
        })
      if (result.error) {
        const {error} = result
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occured.");
        }    
      }
    });

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      Hello!!!!
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
