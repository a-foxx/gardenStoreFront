import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Login() {
  const [open, setOpen] = useState(true);
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 

  const submitLogin = async () => {
    const data = {email: username, password};
    await fetch('http://localhost:3000/login',  {
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
  .catch(error => console.error(error))
  }

  const handleClose = () => {
    setOpen(false);
    history(-1)
  };

  return (
    <div >
      <Dialog open={open} >
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
            type="email"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <NavLink to="/Register"><Button>Register account</Button></NavLink>
          <Button onClick={submitLogin}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// export default function Login({close}) {
//   const history = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showReg, setShowReg] = useState(false);

  // const submitLogin = async () => {
    // const data = new FormData();
    // data.append('username', username);
    // data.append('password', password);
  //   const data = {email: username, password};
  //   await fetch('http://localhost:3000/login',  {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  // })
  // .then(response => response.json())
  // .then(response => {
  //   console.log(response)
  //   history('/Home')
  // })
  // .catch(error => console.error(error))
  // }
  
//     return    (
//         /* login window */
//     <>
//       <div className="windowContainer active">
//         <div className='window-header'>
          
//           <h2>Login</h2>
//           <button data-close-button className='close-button' onClick={close}>&times;</button>
//         </div>
//         <div>
//           <div className='window-body login'>
            
//               <label for="username">Email</label>
//               <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" autoComplete="username" required />

//               <label for="password">Password</label>
//               <input id="current-password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" autoComplete="current-password" required />

//               <button type="submit" onClick={submitLogin} id="submit">Submit</button>
            
//             <label for="new-account" className='new-account-text' onClick={() => setShowReg(!showReg)}>Register new account</label>
//           </div>
//         </div>
//       </div>
      
//       <div className='active' id='overlay'></div>
//       {showReg && <Registration close={() => setShowReg(false)}/>}
    
//     </>
//     );
// };
