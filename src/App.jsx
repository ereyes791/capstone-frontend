import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './views/Home';
import LoginView from './views/Login';
import ProductDetail from './views/ProductDetails';
import './App.css';
import RegisterForm from './views/Register';
import React, { useState } from 'react';
import Cart from './views/Cart';
import OrderView from './views/Order';
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home token ={token} user ={user} setUser ={setUser}/>} />
          <Route path="/register" element={<RegisterForm setToken={setToken} />} />
          <Route path="/login" element={<LoginView setToken ={setToken}/>} />
          <Route path="/products/:id" element={<ProductDetail token={token}/>} />
          <Route path ="/cart" element ={<Cart token={token} user={user}/>} />
          <Route path="/orders" element={<OrderView token={token}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
