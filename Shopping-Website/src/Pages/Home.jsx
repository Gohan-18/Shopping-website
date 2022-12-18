import React from 'react';
import { useState, useEffect } from 'react';

const Home = () => {

  const [product, setproduct] = useState([]);

  useEffect(() => {

    const productList = async () => {
      const data = await fetch('https://fakestoreapi.com/products/1')
      const result = data.json();
      setproduct(result);
    };
  
    return () => {
      productList();
    }

  }, [])
  
  return (
    <pre>{JSON.stringify(product, null, 2)}</pre>
  )
}

export default Home