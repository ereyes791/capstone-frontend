import React from 'react';
import { Typography,Button } from '@mui/material';
import ProductCard from '../components/product';
import { useEffect,useState } from 'react';
import NavigationBar from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

const OrderListView = ({url,token,user}) => {

        const [orders, setOrders] = useState([]);
        const navigationButtons = [{path: "/", name: "Home"},{path: "/cart", name: "My Cart"}];

        useEffect(() => {
                fetch(url+'/api/user/allOrders', {
                        method: "GET",
                        headers: {
                                'Content-Type': 'application',
                                'Authorization': 'Bearer '+token,
                        },})
                        .then(response => response.json())
                        .then(data => {
                                setOrders(data);
                            console.log(data); // Log the fetched products
                        })
                        .catch(error => {
                            console.error('Error fetching products:', error);
                        });
                }, []);
                
    return (
        <div>
        <NavigationBar linksArrays={navigationButtons}/>
        <h2>All Orders</h2>
        {orders.length === 0 ? (
                <Typography variant="body1">You don't have any orders.</Typography>
        ) : (
                orders.map(order => (
                <div key={order.order_id}>
                        <Typography variant="h6">Order ID: {order.order_id}</Typography>
                        {order.products.map(product => (
                        <ProductCard key={product.product_id} product={product} quantity={product.quantity}/>
                        ))}
                </div>
                ))
        )}
</div>
    );
};

export default OrderListView;
