import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'


export default function Delivery() {
  const [open, setOpen] = React.useState(true);  
  const history = useNavigate();

  const handleClose = () => {
    setOpen(false);
    history(-1)
  };  
  return (
    <div >
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle selected className='DialogTitle' onClose={handleClose}>Delivery</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>We are located in the UK.<br/> Deliveries are priced at £5. <br/>All international deliveries are priced at £10.<br/>Feel free to email us..<br/>GardenStore@gmail.com</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}