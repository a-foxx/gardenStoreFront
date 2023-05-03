import React from "react"
import { useState } from 'react'
import NavigationDrawer from './Drawer.js'
import Login from '../login/Login.js'
import Cart from '../cart/Cart.js'
import {useCartContext} from '../context/context'
import { NavLink } from "react-router-dom"

export default function NavBar() {
    const [showDrawer, setShowDrawer] = useState(false);
    const cartItems = useCartContext()

    return (
        <div className="nav">
        <NavigationDrawer />
        <NavLink to="/Login" element={<Login />} >
            <img className='nav-img' src='images/account.png' alt='' />
        </NavLink>
        <NavLink to="/Cart" element={<Cart />} >
            <img className='nav-img cart-nav-icon' src='images/cart.png' alt='' />
            <span className="cart-nav-bubble" style={{display: cartItems.length > 0 ? 'inline' : 'none'}}>{cartItems.length}</span>
        </NavLink>
        {showDrawer && <NavigationDrawer close={() => setShowDrawer(false)}/>}
        </div>
    )
   
    
}