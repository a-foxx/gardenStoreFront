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
  const [response, setResponse] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + '/checkedLoggedIn', {credentials: 'include'})
    .then(response => response.json())
    .then(response => {
      if (response.message === true) {
        return history('/Home');
      }
    })
    .catch(err => console.log(err)) 
  }, [])
  

  const submitLogin = async () => {
    // Ensure fields aren't sent as null
    if (!username || !password) {
      setResponse('All fields must be completed');
      return;
    }
    try {
      const data = { email: username, password: password };
      const response = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const responseData = await response.json();
      if (responseData.message === 'Incorrect password' || 'User not found') {
        setResponse(responseData.message);
      } 
      if (responseData.message === 'Successfully Authenticated') {
        history('/Home')
      }
    } catch (error) {
      console.log(response);
      console.error('Login error:', error);
      setResponse('An error occurred during login. Please try again.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    history('/Home')
  };

  const googleAuth = async () => {
    window.open(process.env.REACT_APP_SERVER_URL + "/auth/google", "_self")

  }

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
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        {/* displays response from server */}
        {response && (
          <div style={{ display: 'block' }}>
            {response}
          </div>
        )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <NavLink to="/Register"><Button>Register</Button></NavLink>
          <Button onClick={googleAuth}>Google</Button>
          <Button onClick={submitLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

