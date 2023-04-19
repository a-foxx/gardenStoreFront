import React from 'react';
import { useState } from 'react';
import Registration from './Registration';

export default function Login({close}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showReg, setShowReg] = useState(false);

  const submitLogin = async () => {
    // const data = new FormData();
    // data.append('username', username);
    // data.append('password', password);
    const data = {username, password};
    await fetch('http://localhost:3000/login',  {
      method: 'POST',
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.error(error))
  }
  


    return    (
        /* login window */
    <>
      <div className="windowContainer active">
        <div className='window-header'>
          
          <h2>Login</h2>
          <button data-close-button className='close-button' onClick={close}>&times;</button>
        </div>
        <div>
          <div className='window-body login'>
            
              <label for="username">Email</label>
              <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" autoComplete="username" required />

              <label for="password">Password</label>
              <input id="current-password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" autoComplete="current-password" required />

              <button type="submit" onClick={submitLogin} id="submit">Submit</button>
            
            <label for="new-account" className='new-account-text' onClick={() => setShowReg(!showReg)}>Register new account</label>
          </div>
        </div>
      </div>
      
      <div className='active' id='overlay'></div>
      {showReg && <Registration close={() => setShowReg(false)}/>}
    
    </>
    );
};
