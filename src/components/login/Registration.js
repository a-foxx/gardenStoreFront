import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom'

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const history = useNavigate();

  // post request
  const submit = async () => {
    // ensures fields aren't sent as null
    if (!firstName || !lastName || !email || !password) {
      setResponse('All fields must be completed');
      return;
    }
    const data = { firstName, lastName, email, password };
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      const responseData = await response.json();
      if (responseData.message === 'Email exists, please login') {
        // sets response to display to user
        setResponse(responseData.message);
      } else {
        // Directs to login on successful registration
        history('/Login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setResponse('An error occurred during registration. Please try again.');
    }
  };

  const handleClose = () => {
    history('/Home')
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your details below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <TextField
          autoFocus
          margin="dense"
          id="lastName"
          label="Last name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            value={password}
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
          <Button onClick={submit}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
