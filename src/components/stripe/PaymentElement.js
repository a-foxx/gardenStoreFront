import '../../stripe.css';
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from 'react-router';

function Payment() {
  const location = useLocation()
  console.log('location payment', location.state)
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL,'stripe/config').then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
      // setStripePromise(loadStripe('pk_test_51NKSqTLecDVOk4XTtJKH3OpmlvHVgQxAVEDgikKkDJQcxTdwsVyBYHhtN1D4L2slf1VErVzZacrmG7WiwHbahURY00KIpCwMoI'));
      console.log('stripePromise state from /stripe/config: ', publishableKey)
    });
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL,'stripe/create-payment-intent', {
      method: "POST",
      body: JSON.stringify({amount: location.state.data.total}),
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    })
    .then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1>Make payment via Stripe</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm data={location.state.data} />
        </Elements>
      )}
    </>
  );
}

export default Payment;