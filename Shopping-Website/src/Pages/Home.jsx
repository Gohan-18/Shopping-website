import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Rating, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';

const Home = () => {

  const [product, setproduct] = useState([]);
  const theme = useTheme();

  const productList = async () => {
    const data = await fetch('https://fakestoreapi.com/products/');
    const result = await data.json();
    console.log(result);
    setproduct(result);
  };

  useEffect(() => {
    productList();
  }, [])

  // {
  //   "id": 1,
  //   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //   "price": 109.95,
  //   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //   "category": "men's clothing",
  //   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //   "rating": {
  //     "rate": 3.9,
  //     "count": 120
  //   }
  // }
  
  return (

    // <h1>Hello</h1>
    <Container sx={{ py : 8 }} maxWidth='lg'>
      <Grid container spacing={4}>
        {product.map(({title, id, price, description, image, rating}) => (
          <Grid item key={id} xs={12} sm={6} lg={3}>
            <Card sx={{height:'100%', display:'flex', flexDirection:'column'}}>
              <CardMedia 
              component='img' 
              image={image} 
              alt={title}
              sx={{alignSelf:'center', width:theme.spacing(30), height:theme.spacing(30), objectFit:'contain', pt: theme.spacing(3)}} />
              <CardContent>
                <Typography 
                variant='h5' 
                component='h2' 
                gutterBottom 
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  '-webkit-line-clamp': '1',
                  '-webkit-box-orient': 'vertical'
                }}>
                  {title}
                </Typography>
                <Typography  
                gutterBottom 
                paragraph
                color='text.secondary'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  '-webkit-line-clamp': '2',
                  '-webkit-box-orient': 'vertical',
                }}>
                  {description}
                </Typography>
                <Typography fontSize='large' paragraph >${price}</Typography>
                <Rating readOnly precision={0.5} value={rating.rate}/>
              </CardContent>
              <CardActions 
                sx={{
                  alignSelf:'center',
                  alignContent:'center',
                  marginBottom:'20px'
                }}>
                  <Button variant='contained'>
                    <ShoppingCartOutlined/>
                    Add to cart
                  </Button>
                </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home