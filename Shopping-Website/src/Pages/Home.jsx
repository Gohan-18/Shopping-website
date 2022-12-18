import React from 'react';
import { useState, useEffect } from 'react';

const Home = () => {

  const [product, setproduct] = useState([]);

  const productList = async () => {
    const data = await fetch('https://fakestoreapi.com/products/');
    const result = await data.json();
    setproduct(result);
  };

  useEffect(() => {
    productList();
  }, [])
  
  return (
    <pre>{JSON.stringify(product, null, 2)}</pre>
  )
}

export default Home