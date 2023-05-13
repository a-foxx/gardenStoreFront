import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Login() {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  // useEffect(() => {
  //   fetch('http://localhost:3000/checkedLoggedIn')
  //   .then(response => response.json())
  //   .then(response => {
  //     if (response.message === 'true') {
  //       return history('/Home');
  //     }
  //   })
  //   .catch(err => console.log(err)) 
  // }, [])
  

    const submitLogin = async () => {
      const data = {email: username, password};
      await fetch('http://localhost:3000/auth/login',  {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      history('/Home')
    })
    .catch(error => console.error('cats', error))
    }

  const handleClose = () => {
    setOpen(false);
    history(-1)
  };

  return (
    <div >
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your credentials below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <NavLink to="/Register"><Button>Register account</Button></NavLink>
          <Button onClick={submitLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

