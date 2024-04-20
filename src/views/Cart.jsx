import React from 'react';
import { Typography,Button } from '@mui/material';
import ProductCard from '../components/product';
import { useEffect,useState } from 'react';
import NavigationBar from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

const CartView = ({token,user}) => {
  const navigate = useNavigate();
    const [selectedProducts, setProducts] = useState([]);
    const navigationButtons = [{path: "/", name: "Home"}];
    useEffect(() => {
        fetch('http://localhost:3000/api/user/cart',{
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token,
          },}
      )
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
                        products.push(product);
                    }
                });
                setProducts(products); // Update state with fetched products
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
        }, []);
    const handleCheckout = () => {
      // Perform checkout logic here, such as redirecting to a checkout page or displaying a confirmation message
      navigate('/orders');
      console.log('Checkout clicked');
    };
  return (
    <div>
      <NavigationBar linksArrays={navigationButtons}/>
      <h2>Shopping Cart</h2>
      {selectedProducts.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        selectedProducts.map(product => (
            <ProductCard key={product.product_id} product={product} quantity={product.quantity}/>
        ))
      )}
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default CartView;
