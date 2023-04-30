import React, {useState} from "react";

export default function Checkout() {
    const [number, setNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [postcode, setPostcode] = useState(null);
// use a get request to render customer details name, email. 
// use form below to post address to checkout table
// create order summary of cart contents.

    const confirmCheckout = async () => {
        const data = {}
        await fetch('/postCheckout', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
    return (
        <>
        <label for='address'>Address</label>
        <input id='address-number' type='text' onChange={(e) => setNumber(e.target.value)} required></input>
        <input id='address' type="text"  onChange={(e) => setAddress(e.target.value)} required></input>
        <input id='postcode' type="text" onChange={(e) => setPostcode(e.target.value)}></input>
        <button type="submit" onClick={confirmCheckout}></button>
        </>
    );
};