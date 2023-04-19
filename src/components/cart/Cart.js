import React from 'react';
import { useCartContext } from '../context/context';
import { useState,} from 'react';


export default function Cart({close}) {
  const cartItems = useCartContext()
  console.log(cartItems)
  const [cart, setCart] = useState(cartItems);
  const [qty, setQty] = useState(1);

  const cartPost = async (req, res) => {
      /*const data = {
        created: date.now(), 
        quantity: cartItems.quantity, 
        user_id: req.params??, 
        product_id: cartItems.product_id 
      };
      */
      const data = {}
      await fetch('http://localhost:3000/addtocart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  const subTotal = () => {
    let total = 0
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i]
      console.log(total)
    }
  }

  const listCart = cart.map((product) => (
        <div key={product.id}className='cart-contents'>
          <img className='cart-img' src={product.img_url} alt=''/>
          <h4>{product.name}</h4>
          <div>£{product.price}</div>
          <div className='cart-qty'>{qty}</div>
          <div className='qty-buttons'>
              <button id="qty-up" onClick={() => setQty(qty + 1)}>+</button>
              <button id="qty-down" onClick={() => setQty(qty - 1)}>-</button>
          </div>
        </div>
    
  ))

  return (
    <>       
    <div className="windowContainer active">
      <div className='window-header'>
        <h2>Cart</h2>
        <button data-close-button className='close-button' onClick={close} >&times;</button>
      </div>
      <div className='window-body'>
        <label htmlFor="total">Subtotal  £{subTotal}</label> 
        {listCart}
        <div>
          <button type='submit' id='cart-payment' onClick={cartPost}>Proceed to payment</button>
        </div>
      </div>
    </div>
 <div className='active' id='overlay'></div>
  </>
    )
}
