import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home  from './components/Home';
import Login from './components/login/Login';
import Registration from './components/login/Registration';
import { CartItemProvider } from './components/context/context';
import  ProductPage  from './components/products/ProductPage';
import Cart from './components/cart/Cart'
import Delivery from './components/pages/delivery';

function App() {

  return (
    <CartItemProvider>
      <Routes>
        <Route exact path='/Home' element={<Home />} />
        <Route exact path='/Cart' element={<Cart />} />
        <Route exact path='/Product' element={<ProductPage />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Register' element={<Registration />} />
        <Route exact path='/Delivery' element={<Delivery />} />
        <Route exact path='/Product-Page/:productId' element={<ProductPage />} />
      </Routes>
    </CartItemProvider>

  )


}

export default App;
