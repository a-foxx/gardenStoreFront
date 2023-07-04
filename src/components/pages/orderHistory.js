import * as React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import CheckoutItems from "../Checkout/CheckoutItems"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from "@mui/material";


export default function OrderHistory() {
  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const [load, setLoad] = useState(true)
  const [data, setData] = useState([])
  const history = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/getUserOrder', {credentials: 'include'})
    .then(response => response.json())
    .then(response => {
        setLoad(false);
        setData(response.data)
    })
    .catch(err => console.log('error: ', err))
}, [])


const handleClose = () => {
  history('/Home')
};

if (load) return <div>loading...</div>
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth maxWidth="m"
      >
        <DialogTitle id="scroll-dialog-title" >Order History</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            {data.map((item, id) => {
                const orderDate = new Date(item.created);

                // Format the date components
                const formattedDate = `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
                
                return  <div key={'order' + id}>      
                <h3>Order Details:</h3>
                <p><strong>Order Date:</strong> {formattedDate}</p>
                <p><strong>Shipping Address:</strong> {item.shipping_address}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Total:</strong> £{item.total}</p>
          
                <h4>Cart Contents:</h4>
                
                {item.cart_contents.map((cartItem, index) => {
                    return <CheckoutItems product={cartItem} key={'cartItem' + index}/>})} 
                <Divider/>
            </div>
        })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}