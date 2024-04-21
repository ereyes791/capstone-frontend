import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Dialog, DialogActions , DialogContent ,
  DialogContentText , DialogTitle  } from '@mui/material'; // Import MUI components
import { Carousel } from 'react-responsive-carousel'; // Import Carousel component
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import Carousel styles
import NavigationBar from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({url,token}) => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigationButtons = [{path: "/", name: "Home"}];
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const goToLogin = () => {
    navigate('/login');
  };
  useEffect(() => {
    // Fetch the product details based on the id
    fetch(url+'/api/products/'+id)
      .then((data) => data.json())
      .then((product) => {
          setProduct(product);
        })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = () => {
    // check if we have token
    if (!token) {
      setOpen(true);
      return;
    }
    // Handle adding the product to the cart
    // You can implement this functionality based on your application's logic
    fetch(url+'/api/user/cart/'+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
      },
      body: JSON.stringify({ quantity: quantity }),
    })
      .then(response => response.json())
      .then(data => {
        navigate('/cart');
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  if (!product) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div>
      <NavigationBar linksArrays={navigationButtons}/>
      <Typography sx={{marginTop:4}} variant="h4">Product Details</Typography>
      <Typography variant="h5">{product.name}</Typography>
      <div className='product-detail'>
        <Carousel sx={{width:140}}>
          {product.image_links.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Product Image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
        <div className='product-info'>
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
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Register Message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              You have to login to add to cart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={goToLogin} autoFocus>
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
