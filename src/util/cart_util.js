import React from "react";
// import Products from "../components/products/Products";
// import { useState } from "react";
// import Registration from "../components/login/Registration"



export function CartFill ({product, close}) {

    return (
    <>
      <div className="windowContainer active">
        <div className='window-header'>
          <h2>Cart</h2>
          <button data-close-button className='close-button' onClick={close}>&times;</button>
        </div>
          <div className='cart-contents'>
            
            <img className="product-images" src={product.img_url} alt=''/>
            <h3>{product.name}</h3>
            <p className="price">£{product.price}</p>
            <div className='qty-buttons'>
              <button id="qty-up">+</button>
              <button id="qty-down">-</button>
            </div>
            <button type="submit" id="cartSubmit">Proceed to payment</button>
          </div>
         
      </div>  
      <div id='overlay'></div>
    </>
    )

}

module.exports = {CartFill}