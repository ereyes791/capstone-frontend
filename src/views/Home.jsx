import PrimarySearchAppBar from "../components/navBar";
import React, { useEffect, useState } from 'react';
import ProductCard from "../components/product";

function Home( { setToken,url,token,user,setUser}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      fetch(url+'/api/products')
        .then(response => response.json())
        .then(data => {
          console.log(data); // Log the fetched products
          setProducts(data); // Update state with fetched products
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }, []);
  return (
    <section>
        <PrimarySearchAppBar setToken={setToken} token = {token} user ={user} setUser={setUser} setProducts={setProducts}/>
        <div>
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
    </section>
  );
}

export default Home;