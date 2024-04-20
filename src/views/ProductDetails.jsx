import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Grid, Card, CardContent, CardMedia } from '@mui/material'; // Import MUI components
import { Carousel } from 'react-responsive-carousel'; // Import Carousel component
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import Carousel styles
import NavigationBar from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({token}) => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigationButtons = [{path: "/", name: "Home"}];
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product details based on the id
    fetch('http://localhost:3000/api/products/'+id)
      .then((data) => data.json())
      .then((product) => {
          setProduct(product);
        })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = () => {
    // Handle adding the product to the cart
    // You can implement this functionality based on your application's logic
    fetch('http://localhost:3000/api/user/cart/'+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
      },
      body: JSON.stringify({ quantity: quantity }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    navigate('/cart');
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  if (!product) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div>
      <NavigationBar linksArrays={navigationButtons}/>
      <Typography variant="h4">Product Detail</Typography>
      <Typography variant="h5">{product.name}</Typography>
      <Carousel sx={{width:140}}>
        {product.image_links.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Product Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="body1">Price: ${product.price}</Typography>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDetail;
