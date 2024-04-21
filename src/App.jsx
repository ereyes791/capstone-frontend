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
import OrderList from './views/OrderList';
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const url = 'https://capstone-backend-cm7x.onrender.com';
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home setToken ={setToken} url ={url} token ={token} user ={user} setUser ={setUser}/>} />
          <Route path="/register" element={<RegisterForm url ={url} setToken={setToken} />} />
          <Route path="/login" element={<LoginView url ={url} setToken ={setToken}/>} />
          <Route path="/products/:id" element={<ProductDetail url ={url} token={token}/>} />
          <Route path ="/cart" element ={<Cart url ={url} token={token} user={user}/>} />
          <Route path="/order" element={<OrderView url ={url} token={token}/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/orders" element={<OrderList url ={url} token={token} user={user} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
