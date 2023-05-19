import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router';
import { useCartContext } from '../context/context';
import { useState} from 'react';
import CartItem from './CartItem';
// import { cartPost } from './CartItem';
// var cookieParser = require('cookie-parser');
// const express = require('express');
// const app = express();
// app.use(cookieParser());

export default function Cart() {
  // const ref = useRef();
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const cartItems = useCartContext()
  const [cart, setCart] = useState(cartItems);
  // const [qty, setQty] = useState(1);
  // const [parentQty, setParentQty] = useState([]);
  const history = useNavigate();

    // post to carts table
    const data = { created: new Date() }
    fetch('http://localhost:3000/addtocart', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
  const mergeCartItems = {};
  cart.map(item => {
    if (mergeCartItems[item.product_id]) {
      mergeCartItems[item.product_id] = {
        ...item, qty: mergeCartItems[item.product_id].qty+1
      }
    } else {
      mergeCartItems[item.product_id] = {...item, qty: 1}
    }
  })
  
  // console.log('mergecartitems', mergeCartItems);
  const listCart = Object.values(mergeCartItems).map((product) => (
    <CartItem 
    product={product} 
    key={product.product_id} 
    // ref={ref}
    />
    ))
    
    // console.log('parent-qty', parentQty)
    
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
          <Button 
          // onClick={cartPost}
          >Make payment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}