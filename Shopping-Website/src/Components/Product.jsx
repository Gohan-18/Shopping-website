import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../feature/Product-slice';
import { useSelector } from 'react-redux';
import { Typography, Container, Grid, Divider, CardMedia, useTheme, Paper, IconButton, Rating, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { addTOCart } from '../feature/Cart-slice';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export default function Product() {

  const state = useSelector((state) => state.products);
  const { singleValue } = state ?? {};
  let {title, id, price, description, images, rating, discountPercentage, stock, brand} = singleValue;
  let imageList = [];
  const [currentIndex, setcurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  for(let i = 0; i < images?.length; i++){
    imageList.push(images[i]);
  }
  const theme = useTheme();

  const params = useParams();
  const { productid } = params;

  useEffect(() => {
      dispatch(fetchSingleProduct({productid}));
  }, []);

  function addProductToCart (product) {
    dispatch(addTOCart({product, quantity:1}));
  }

  function navigateToHome() {
    navigate('/');
  }
    
  return (
    <>
    <Container maxWidth='lg' sx={{pt:{xs: theme.spacing(4), md: theme.spacing(12)}, pb:theme.spacing(15), position: 'relative'}}>
      <IconButton onClick={navigateToHome} sx={{position: 'absolute', top: '30px', left: '20px', zIndex: '2'}} >
        <ChevronLeftRoundedIcon fontSize='large'/>
      </IconButton>
      <Grid container item >
      <Grid item container xs={12} md={6} >
          <Box sx={{ position: 'relative', margin: 'auto'}}>
            <Paper elevation={0} sx={{}} >
              <IconButton sx={{position: 'absolute', top: '50%', left: '10px'}}>
                <NavigateBeforeRoundedIcon/>
              </IconButton>
              <IconButton sx={{position: 'absolute', top: '50%', right: '10px'}}>
                <NavigateNextRoundedIcon />
              </IconButton>
              <CardMedia
                component='img'
                image={imageList[0]}
                alt={title}
                sx={{
                  alignSelf:'center', 
                  width:theme.spacing(40), 
                  height:theme.spacing(40), 
                  objectFit:'contain'
                }}
              />
            </Paper>
          </Box>
      </Grid>
      <Grid item container xs={12} md={6} sx={{padding: '20px'}}>
          <Box sx={{ position: 'relative', margin: 'auto'}}>
            <Paper elevation={0}  >
              <Typography variant='h5' gutterBottom>{title} </Typography>
              <Rating readOnly precision={0.5} value={rating} size='small' />
              <Box sx={{py: '10px'}} >
                <Typography sx={{fontSize: { xs:'25px', sm: '30px' }}} component='span'>${price}</Typography>
                <Typography sx={{fontSize:{ xs:'16px', sm: '15px' }, ml: 1, color: '#e63946'}} component='span'>({discountPercentage}% OFF)</Typography>
              </Box>
              <Typography gutterBottom>{description}</Typography>
              <Divider variant="middle" sx={{my: '20px'}} />
              <Typography variant='span' sx={{fontWeight: '500'}} >Availability : {stock > 0 ? <Typography variant='span' color='#006400' sx={{fontWeight: '500', px: '10px'}} >- In Stock -</Typography> : <Typography variant='span' sx={{fontWeight: '500', px: '10px'}} color='error'>- Out Of Stock -</Typography>}</Typography>
              <Typography sx={{fontWeight: '500'}} >Brand : {brand} </Typography>
            </Paper>
            <Box 
                sx={{
                  alignSelf:'center',
                  alignContent:'center',
                  py:'20px'
                }}>
                  {stock > 0 ? <Button variant='contained' 
                    onClick={() => {
                      addProductToCart({title, id, price, description, images, rating});
                    }}>
                    <ShoppingCartOutlined/>
                    Add to cart
                  </Button> : 
                  <Button variant='contained' disabled>
                    Out Of Stock
                  </Button>}
              </Box>
          </Box>
      </Grid>
      </Grid>
    </Container>
    </>
  )
}
