import React, { useState, useEffect } from 'react';
import {useCartContext, useCartDispatch} from '../context/context'
import { NavLink } from 'react-router-dom'

export default function Products() {
const cartItems = useCartContext
const cartDispatch = useCartDispatch()
const [products, setProducts] = useState([]);


// console.log(cartItems())
useEffect(() => {
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(response => {
        setProducts(response)})
    .catch(error => console.error(error))
}, [])

const addToCart = (el) => {
    const data = {
        ...el
    } 
    const product_id = {product_id: data.product_id}; 

    fetch('http://localhost:3000/checkCarts', { 
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
            fetch('http://localhost:3000/CartQtyIncrease', {
                method: 'PUT',
                body: JSON.stringify(product_id),
                headers: {
                  'Content-type': 'application/json'
                },
                credentials: 'include',
              })
              .then(response => response.json())
              .catch(err => console.log(err))
        // first post to carts table for that product
        } 
        if (response.message === false) {
            fetch('http://localhost:3000/addtocart', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include'
                })
                .then(response => response.json())
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
            <img className="product-images" src={product.img_url} alt='' />
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