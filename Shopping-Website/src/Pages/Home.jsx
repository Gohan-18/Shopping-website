import React from 'react';
import { useState } from 'react';

const Home = () => {

    const [product, setproduct] = useState([])

  return (
    <pre>{JSON.stringify(product, null, 2)}</pre>
  )
}

export default Home