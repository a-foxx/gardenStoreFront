import React, { useState, useEffect } from 'react';
import {useCartContext, useCartDispatch} from '../context/context'
import { Route, NavLink } from 'react-router-dom'
import ProductPage from './ProductPage.js'

export default function Products() {

    const cartItems = useCartContext
    const cartDispatch = useCartDispatch()
    const [products, setProducts] = useState([]);
    const [showPage, setShowPage] = useState(false);
    
    console.log(cartItems())
    useEffect(() => {
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(response => {
            setProducts(response)})
        .catch(error => console.error(error))
    }, [])

    const addToCart = (el) => {
        // setCart([...cart, el])
        cartDispatch({type: 'add', data: el})
      }


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