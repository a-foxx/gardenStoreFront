import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, NavLink } from 'react-router-dom';
import { useCartContext } from '../context/context';
import { useState, useEffect } from 'react';
import CartItem from './CartItem';

export default function Cart() {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const cartItems = useCartContext();
  const [cart, setCart] = useState(cartItems);
  const [load, setLoad] = useState(true);
  const history = useNavigate();
  console.log('state: cart -- ', cart)

  // checks if logged in
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL,'/checkedLoggedIn', {credentials: 'include'})
    .then(response => response.json())
    .then(response => {
      if (response.message === false) {
        return history('/Login');
      }
    })
    .catch(err => console.log(err)) 
  }, [])

  // renders cart
  useEffect(() => {
    // if (cart.length) {
      fetch(process.env.REACT_APP_SERVER_URL,'/getUserCart', {credentials: 'include'})
      .then(response => response.json())
      .then(response => {
        setCart(response);
        setLoad(false);
      })
      .catch(err => console.log(err))
    // }
  }, [])

  // changes quantity of product
  const updateCartItem = async (cart_id, quantity, product_id) => {
    const data = { cart_id, quantity, product_id }
     await fetch(process.env.REACT_APP_SERVER_URL,'/updateUserCart', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
    })
    
    .then(response => response.json())
    .catch(err => console.log(err))
  }

  const changeCartState = (product_id) => {
    const newCart = cart.filter((product) => product.product_id !== product_id)
    setCart(newCart)
    console.log(product_id, newCart)
  }

  const listCart = cart.map((product) => (
    <CartItem 
    product={product}
    key={product.product_id}
    
    changeCartItem={(cart_id, quantity, product_id) => updateCartItem(cart_id, quantity, product_id)}

    onDeleteProduct={changeCartState}
  
    />
    ))
    
    const handleClose = () => {
      setOpen(false);
      history(-1);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  if (load) return <div>loading...</div>

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Cart</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {listCart}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <NavLink to='/Checkout'><Button>Checkout</Button></NavLink>
        </DialogActions>
      </Dialog>
    </div>
  );
}