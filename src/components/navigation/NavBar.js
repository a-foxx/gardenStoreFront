import React from "react"
import { useState } from 'react'
import NavigationDrawer from './Drawer.js'
import Login from '../login/Login.js'
import Cart from '../cart/Cart.js'
import {useCartContext} from '../context/context'
import Button from '@mui/material/Button';

export default function NavBar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const cartItems = useCartContext()

    return (
        <>
        <NavigationDrawer />
        {/* <Button onClick={() => setShowDrawer(!showDrawer)}><img className='nav-img burger' src='images/hamburger-menu-icon-svg-7.png' alt=''/></Button> */}
        <img className='nav-img' src='images/account.png' alt='' 
        onClick={() => setShowLogin(!showLogin)}/>
        <div className="cart-navbar">
            <img className='nav-img cart-nav-icon' src='images/cart.png' alt='' 
            onClick={() => setShowCart(!showCart)}/>
            <span className="cart-nav-bubble" style={{display: cartItems.length > 0 ? 'inline' : 'none'}}>{cartItems.length}</span>
        </div>
        {showDrawer && <NavigationDrawer close={() => setShowDrawer(false)}/>}
        {showLogin && <Login close={() => setShowLogin(false)}/>}
        {showCart && <Cart close={() => setShowCart(false)}/>}
        {/* {showReg && <Registration close={() => setShowReg(false)}/>} */}
        </>
    )
   
    
}