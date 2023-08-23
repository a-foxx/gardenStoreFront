import React, { useState, useEffect } from 'react';
import {useCartDispatch} from '../context/context'
import { NavLink } from 'react-router-dom'

export default function Products() {
const cartDispatch = useCartDispatch()
const [products, setProducts] = useState([]);
const [addingToCart, setAddingToCart] = useState(false);

// console.log(cartItems())
useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/products`)
    .then(response => response.json())
    .then(response => {
        setProducts(response)})
    .catch(error => console.error(error))
}, [])

const addToCart = (el) => {

    if (addingToCart) {
        return; // Prevent multiple clicks while a request is ongoing
      }

    setAddingToCart(true); // Start the cart addition process

    const data = {
        ...el
    } 
    const product_id = {product_id: data.product_id}; 

    fetch(process.env.REACT_APP_SERVER_URL + '/checkCarts', { 
        method: 'POST',
        body: JSON.stringify(product_id),
        headers: {
            'Content-type': 'application/json'
            },
        credentials: 'include' 
    })
    .then(response => response.json())
    .then(response => {
        // if user has product in cart updates qty
        if (response.message === true) { 
            fetch(process.env.REACT_APP_SERVER_URL + '/CartQtyIncrease', {
                method: 'PUT',
                body: JSON.stringify(product_id),
                headers: {
                  'Content-type': 'application/json'
                },
                credentials: 'include',
              })
              .then(response => response.json())
              .then(response => setAddingToCart(false))
              .catch(err => console.log(err))
        // first post to carts table for that product
        } 
        if (response.message === false) {
            fetch(process.env.REACT_APP_SERVER_URL + '/addtocart', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include'
                })
                .then(response => response.json())
                .then(response => setAddingToCart(false))
                .then(response => {
                    cartDispatch({type: 'add', data: {...response.data, ...el}})
                })
                .catch(error => console.log(error))
        }
    })
    }

// mapping products from db
    const listProducts = products.map((product) => (
        <div key={product.product_id} className="products">
            <NavLink to={`/Product-Page/${product.product_id}`}>
            <img className="product-images" src={product.image} alt='' />
            </NavLink>
            <h2>{product.name}</h2>
            <p className="price">£{product.price}</p>

            <button name="addToCartbutton" onClick={() => addToCart(product)}>Add to cart</button>
        </div>
    ))

    return (
        <>
            <div className='product-container'>
                {listProducts}
            </div>
        </>
    )
}