import React, { useState, useEffect } from 'react';
import { Typography, Button, Dialog, DialogActions , DialogContent ,
    DialogContentText , DialogTitle  } from '@mui/material';
import NavigationBar from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

const OrderView = ({ url,token }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setProducts] = useState([]);
    const navigationButtons = [{path: "/", name: "Home"}];
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleClose = () => {
      setOpen(false);
      navigate('/');
    };
    const goHome = () => {  
        navigate('/');
    }
    useEffect(() => {
        // Calculate total price when cart items change
        fetch(url+'/api/user/cart',{
            method: "GET",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token,
            },
        })
            .then(response => response.json())
            .then(data => {
                    console.log(data); // Log the fetched products
                    //get data and merge every product that is the same but sum the quantity
                    let products = [];
                    data.forEach(product => {
                            const existingProduct = products.find(p => p.product_id === product.product_id);
                            if (existingProduct) {
                                    existingProduct.quantity += product.quantity;
                            } else {
                                    if(product.in_cart){
                                        products.push(product); 
                                    }
                            }
                    });
                    setProducts(products); // Update state with fetched products

            })
            .catch(error => {
                    console.error('Error fetching products:', error);
            });
    }, []);
    function totalAmount(){
        let total = 0;
        selectedProducts.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }
    //handle order
    function handleOrder(){
        fetch(url+'/api/user/orders',{
            method: "POST",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token, 
            },
            body: JSON.stringify({ total_amount: totalAmount().toFixed(2)}),
        })
            .then(response => response.json())
            .then(data => {
                    setOpen(true);
                    console.log(data); // Log the fetched products
                    selectedProducts.forEach(product => {
                        fetch(url+'/api/user/orders/'+data.order_id,{
                            method: "POST",
                            headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+token, 
                            },
                            body: JSON.stringify({ product_id: product.product_id, quantity: product.quantity}),
                        })
                            .then(response => response.json())
                            .then(data => {
                                    console.log(data); // Log the fetched products
                            })
                            .catch(error => {
                                    console.error('Error fetching products:', error);
                            });
                    } );                     
              })
            .catch(error => {
                    console.error('Error fetching products:', error);
            });
    }

    return (
        <div>
            <NavigationBar linksArrays={navigationButtons}/>
            <h2>Order Summary</h2>
            <ul>
                {selectedProducts.map(item => (
                    <li key={item.product_id}>
                        <Typography variant="body1">
                            {item.name} - ${item.price} - Quantity: {item.quantity}
                        </Typography>
                    </li>
                ))}
            </ul>
            <Typography variant="body1">Total Price: ${totalAmount().toFixed(2)}</Typography>
            <Button variant="contained" color="primary" onClick={handleOrder}>
              Place Order 
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Order Message"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You have suscessfully placed your orders
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={goHome} autoFocus>
                    Go to Home
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderView;
