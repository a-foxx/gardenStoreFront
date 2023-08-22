import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import CheckoutItems from "./CheckoutItems";
import Header from "../../util/header";
import NavBar from "../navigation/NavBar";


export default function Checkout() {
    const [number, setNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [postcode, setPostcode] = useState(null);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState([]);
    const history = useNavigate();
    
    // check if user is logged in
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL,'checkedLoggedIn', {credentials: 'include'})
        .then(response => response.json())
        .then(response => {
            if (response.message === false) {
                return history('/Login');
            }
        })
        .catch(err => console.log(err)) 
    }, [])
    
    // get users cart
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL,'getUserCart', {credentials: 'include'})
        .then(response => response.json())
        .then(response => {
            console.log('add', response)
            setCart(response)
        })
        .catch(err => console.log(err))
    },[])
    
    // gets user info
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL,'getUser', {credentials: 'include'})
        .then(response => response.json())
        .then(response => { 
            setUser(response.data[0])})
            .catch(err => console.log(err))
        },[])
        
    // formats address for req
    const shipAddress = `Number: ${number}, Street: ${address}, Postcode: ${postcode}`;

    const payment = () => {
        const data = {total: totalCost, status: 'PAID', cart_contents: cart, shipAddress}
        history('/stripe/payment', {state: {data: data}})
    }
    
    // renders cart
    const listCart = cart.map((product) => (
        <CheckoutItems 
        product={product}
        key={product.product_id}
        />
    ))
    

    // renders user info 
    const ListUser = (
        <div className="display-users">
            Name: {user.first_name} {user.last_name}<br/>
            Email: {user.email}
        </div>
    )
    
    // cart subtotal calculation
    const calculateTotalCost = (cart) => {
        let totalCost = 0;
      
        cart.forEach((product) => {
          const productTotal = product.price * product.quantity;
          totalCost += productTotal;
        });
      
        return totalCost;
      };

    // renders cart total
    const totalCost = calculateTotalCost(cart);

    return (
        <>
        <Header />
        <nav>
            <NavBar/>
        </nav>
        <div className='checkout-container'>
        {ListUser}
        <div className="address">
            <br/><label for='address'>Shipping address</label>
            <input id='address-number' type='text' placeholder='House Number' onChange={(e) => setNumber(e.target.value)} required></input>
            <input id='address' type="text" placeholder='Address' onChange={(e) => setAddress(e.target.value)} required></input>
            <input id='postcode' type="text" placeholder='Postcode' onChange={(e) => setPostcode(e.target.value)}></input>
        </div>
        {listCart}
        <div className="checkout-total">
            Subtotal:  £{totalCost}<br/>
        </div>
        <button type="submit" onClick={payment} >Make payment</button>
        </div>
        </>
    );
};