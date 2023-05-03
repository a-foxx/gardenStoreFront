import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router';
import { useCartContext } from '../context/context';
import { useState,} from 'react';

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const cartItems = useCartContext()
  const [cart, setCart] = useState(cartItems);
  const [qty, setQty] = useState(1);
  const history = useNavigate();
  
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

const listCart = cart.map((product) => (
    <div key={product.id}className='cart-contents'>
      <img className='cart-img' src={product.img_url} alt=''/>
      {product.name}
      <div>£{product.price}</div>
      <div className='cart-qty'>{qty}</div>
      <div className='qty-buttons'>
          <button id="qty-up" onClick={() => setQty(qty + 1)}>+</button>
          <button id="qty-down" onClick={() => setQty(qty - 1)}>-</button>
      </div>
    </div>
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
          <Button onClick={cartPost}>Make payment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}