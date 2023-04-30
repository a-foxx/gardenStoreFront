import * as React from 'react';
// import { GlobalStyles, withStyles } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import {NavLink} from 'react-router-dom'
// import Home from '../Home';


// import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import MuiDialogTitle from "@material-ui/core/DialogTitle";
// import MuiDialogContent from "@material-ui/core/DialogContent";
// import MuiDialogActions from "@material-ui/core/DialogActions";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
// import Typography from "@material-ui/core/Typography";

export default function Delivery() {
  const [open, setOpen] = React.useState(true);  

  const handleClose = () => {
    setOpen(false);
    <NavLink to="/Home" />
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