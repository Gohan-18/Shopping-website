import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Rating, Typography, useTheme, Box, IconButton, Alert, Fade, CardActionArea } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { addTOCart } from '../feature/Cart-slice';
import { fetchAllProducts } from '../feature/Product-slice';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { addToWishlist } from '../feature/Wishlist-slice';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {

  const state = useSelector((state) => state.products);
  const { value: product, loading} = state ?? {};
  const theme = useTheme();
  const dispatch = useDispatch();
  const [ searchParams ] = useSearchParams();
  const category = searchParams.get('category');
  const searchedTerm = searchParams.get('searchterm');
  const navigate = useNavigate();

  let filteredProduct = category && category !== 'all' ? product.filter( prod => prod.category === category) : product;
  filteredProduct = searchedTerm ? filteredProduct.filter((prod) => prod.title.toLowerCase().includes(searchedTerm.toLowerCase())): filteredProduct;

  if(!product?.length) {
    dispatch(fetchAllProducts());
  }

  function addProductToCart (product) {
    dispatch(addTOCart({product, quantity:1}));
    handleCartOpen();
  }

  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleCartOpen = () => {
    setCartOpen(true);
    setTimeout(() => {
      handleCartClose();
    }, 2000);
  };

  const handleClose = () => setOpen(false);
  const handleCartClose = () => setCartOpen(false);

  function addProductToWishlist(product) {
    dispatch(addToWishlist({product}));
    handleOpen();
  }

  const navigateWishlist = () => {
    navigate('/wishlist');
  }

  const navigateToCart = () => {
    navigate('/cart');
  }

  const navigateProduct = ({id}) => {
    navigate(`/product/${id}`);
  };
  
  return (

    <Container sx={{ pt : {xs: 4, md: 6}, pb: {xs:14, sm:6}, position: 'relative'}} maxWidth='lg'>

      {loading ? <CircularProgress sx={{position: 'fixed', top: '40%', left: {xs :'45%', sm: '48%'}, zIndex: '10'}} /> :
      <>
      <Fade in={open}>
        <Box sx={{position: 'relative', width:'100%', zIndex:100}}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            py:5,
          }} >
            <Alert
            sx={{
              maxWidth: '300px',
              margin: 'auto',
              position: 'fixed',
            }}
                action={
                  <Button color="inherit" size="small" onClick={navigateWishlist}>
                    View
                  </Button>
                }
              >Added to wishlist!!
            </Alert>
          </Box>
        </Box>
      </Fade>

      <Fade in={cartOpen}>
        <Box sx={{position: 'relative', width:'100%', zIndex:100}}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            py:5,
          }} >
            <Alert
            sx={{
              maxWidth: '300px',
              margin: 'auto',
              position: 'fixed',
            }}
                action={
                  <Button color="inherit" size="small" onClick={navigateToCart}>
                    View
                  </Button>
                }
              >Added to Cart!!
            </Alert>
          </Box>
        </Box>
      </Fade>

      <Grid container spacing={2}>
        {filteredProduct.map(({title, id, price, description, images, rating, discountPercentage,stock, brand}) => (
          <Grid item key={id} xs={12} sm={6} lg={3}>
            <Card>
              <CardActionArea
                sx={{height:'100%', display:'flex', flexDirection:'column', position: 'relative'}}
                onClick={(e) =>{ 
                  e.stopPropagation();
                  navigateProduct({id});
                }}
              >
                <IconButton 
                  sx={{position: 'absolute', right: {xs: 5, sm: 10, md: 15},top : {xs: 5, sm: 10, md: 15}}} 
                  onClick={(e) => {
                    e.stopPropagation();
                    addProductToWishlist({title, id, price, description, images, rating, discountPercentage});
                  }}>
                  <FavoriteRoundedIcon  sx={{
                    color: '#adb5bd',
                    '&:active': {
                      fill: '#e63946'
                    }
                  }}/>
                </IconButton>
                <CardMedia 
                component='img' 
                image={images[0]} 
                alt={title}
                sx={{alignSelf:'center', width:theme.spacing(30), height:theme.spacing(30), objectFit:'contain', pt: theme.spacing(3),cursor: 'pointer'}} />
                <CardContent sx={{cursor: 'pointer'}} >
                  <Typography 
                  variant='h5' 
                  component='h2' 
                  gutterBottom 
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical'
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
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {description}
                  </Typography>

                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pr:4
                    }}>

                    <Typography fontSize='md' paragraph sx={{mt:2}} >
                      ${price.toFixed(2)} <Typography sx={{fontSize:{ xs:'12px', sm: '14px', md: '13px' }, color: '#e63946'}} component='span'>({discountPercentage.toFixed(2)}% OFF)</Typography>
                      </Typography>
                  </Box>

                  <Rating readOnly precision={0.5} value={rating} size='small' />

                </CardContent>

                <CardActions 
                  sx={{
                    alignSelf:'center',
                    alignContent:'center',
                    marginBottom:'20px'
                  }}>
                    <Button variant='contained' 
                      onClick={(e) => {
                        e.stopPropagation();
                        addProductToCart({title, id, price, description, images, rating});
                      }}>
                      <ShoppingCartOutlined/>
                      Add to cart
                    </Button>
                </CardActions>
              </CardActionArea>
            </Card>
            
          </Grid>
        ))}
      </Grid> 
      </> }
    </Container>
  )
}

export default Home;
