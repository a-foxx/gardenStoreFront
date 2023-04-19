import './App.css';
// import { useState } from 'react';
import NavBar from './components/navigation/NavBar';
import Products from './components/products/Products.js';
import { CartItemProvider } from './components/context/context';
// import NavigationDrawer from './components/navigation/Drawer.js'
// import Login from './components/login/Login.js'
// import Cart from './components/cart/Cart.js'
// import Registration from "./components/login/Registration.js"

function App() {

  return (
    <CartItemProvider>
    <div className="container">
      <header>
        <img src="images/ash_tree.jpeg" alt=''/>
        <h1>Garden Store</h1>
        <img src="images/oak_tree.webp" alt=''/>
      </header>
      <nav>
        <NavBar/>
      </nav>
      <Products />

     </div>
     </CartItemProvider>
  );


}

export default App;
