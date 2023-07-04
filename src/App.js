import './App.css';
import React from 'react';
import Home  from './components/Home';
import Login from './components/login/Login';
import Registration from './components/login/Registration';
import  ProductPage  from './components/products/ProductPage';
import Cart from './components/cart/Cart'
import Delivery from './components/pages/delivery';
import Checkout from './components/Checkout/Checkout';
import OrderHistory from './components/pages/orderHistory'
import Payment from './components/stripe/PaymentElement';
import Completion from './components/stripe/Completion';
import { Routes, Route } from 'react-router-dom';
import { CartItemProvider } from './components/context/context';

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
        <Route exact path='/Checkout' element={<Checkout />} />
        <Route exact path='/OrderHistory' element={<OrderHistory/>}/>
        <Route exact path="/stripe/payment" element={<Payment />} />
        <Route exact path="/completion" element={<Completion />} />
      </Routes>
    </CartItemProvider>

  )


}

export default App;
