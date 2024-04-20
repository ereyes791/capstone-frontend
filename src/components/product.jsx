// ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
const ProductCard = ({ product,quantity }) => {
  const navigate = useNavigate();  //
  const location = useLocation();
  const { product_id,name, image_links, description,price } = product;
  const handleProductClick = () => {
    // Navigate to the new view with the product ID
    navigate(`/products/${product_id}`);
  };
  return (
    <Card sx={{ width: '95vw', marginRight: 2 , paddingBottom:2}}onClick={handleProductClick}>
      <div style={{ display: 'flex' }}>
        <CardMedia
          component="img"
          height="140"
          image={image_links[0]} // URL of the product image
          alt={name} // Alt text for accessibility
          style={{ width: 140}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.primary">
            ${price}
          </Typography>
          {location.pathname === '/cart' && (
            <Typography variant="body2" color="text.primary">
              Quantity: {quantity}
            </Typography>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;
