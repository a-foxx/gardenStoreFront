import React, { useState } from "react";

export default function Registration({close}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async () => {
      const data = {firstName, lastName, email, password} 
      await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      })
        .then(response => response.json())
        // .then(console.log(response.body))
        .catch(error => console.error('Request failed!', error))
    }

    return (
        <>
        <div className="windowContainer active">
          <div className='window-header'>
            <h2>Register</h2>
            <button data-close-button className='close-button' onClick={close}>&times;</button>
          </div>
          <div className='window-body login'>
            <label for="first-name">First name</label>
            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" name="firstName"/>

            <label for="password">Last name</label>
            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last-name" name="lastName"/>

            <label for="email">Email</label>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" name="email"/>

            <label for="Password">Password</label>
            <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" name="password"/>
            {/* <p id="returned">{handleRequest}</p>da */}
            <button onClick={submit} type="submit" id="submit">Submit</button>
          </div>
        </div>
        <div className='active' id='overlay'></div>
      
        </>
    )
}

