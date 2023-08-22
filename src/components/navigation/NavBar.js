import React from "react"
import { useState, useEffect } from 'react'
import NavigationDrawer from './Drawer.js'
import Login from '../login/Login.js'
import Cart from '../cart/Cart.js'
import { NavLink } from "react-router-dom"

export default function NavBar() {
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + '/getUserCart', {credentials: 'include'})
            .then(response => {
                response.json()
            })
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <div className="nav">
        <NavigationDrawer />
        <NavLink to="/Login" element={<Login />} >
            <img className='nav-img' src='images/account.png' alt='' />
        </NavLink>
        <NavLink to="/Cart" element={<Cart />} >
            <img className='nav-img cart-nav-icon' src='images/cart.png' alt='' />
        </NavLink>
        {showDrawer && <NavigationDrawer close={() => setShowDrawer(false)}/>}
        </div>
    )
   
    
}