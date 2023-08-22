import styled from "@emotion/styled";
import { useState, useEffect } from "react"

export default function CartItem ({product, changeCartItem, onDeleteProduct}) { 
    const [quantity, setQuantity] = useState(product.quantity?? 1);

    const changeCartCount = (newQuantity) => {
        setQuantity(newQuantity)
        changeCartItem(product.cart_id, newQuantity, product.product_id,)
    }

    useEffect(() => {
        setQuantity(product.quantity)
    }, [product])

    const deleteProduct = () => {
        const data = {product_id: product.product_id}
        fetch(process.env.REACT_APP_SERVER_URL + '/deleteCartItem', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
              },
              credentials: 'include'
        })
        .then(() => {
            onDeleteProduct(product.product_id)
        })
    }

    return (
    <div key={product.product_id} className='cart-contents'>
        <img className='cart-img' src={product.image} alt=''/>
        {product.name}
        <div>£{product.price}</div>
        <div className='cart-qty'>{quantity}</div>
        <div className='qty-buttons'>
            <button id="qty-up" 
            onClick={() => changeCartCount(quantity + 1)} 
            >+</button>
            <button id="qty-down" onClick={() => changeCartCount(quantity - 1)}>-</button>
        </div>
            <div onClick={deleteProduct}>&#x2717;</div>
    </div>
    )
}
