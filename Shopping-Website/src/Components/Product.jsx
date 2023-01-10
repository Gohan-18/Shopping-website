import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../feature/Product-slice';
import { useSelector } from 'react-redux';
import { Typography, Container, Grid, Divider, CardMedia, useTheme, Paper, IconButton, Rating, Button, Fade, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { addTOCart } from '../feature/Cart-slice';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { addToWishlist } from '../feature/Wishlist-slice';

export default function Product() {

  const state = useSelector((state) => state.products);
  const { singleValue, loading } = state ?? {};
  let {title, id, price, description, images, rating, discountPercentage, stock, brand} = singleValue;
  let imageList = [];
  const [currentIndex, setcurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => setOpen(false);

  for(let i = 0; i < images?.length; i++){
    imageList.push(images[i]);
  }

  const navigateWishlist = () => {
    navigate('/wishlist');
  }

  const handleNextImage = () => {
    const isLastSlide = currentIndex === imageList.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex); 
  }

  const handlePrevImage = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageList.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
  }

  const theme = useTheme();

  const params = useParams();
  const { productid } = params;

  useEffect(() => {
    dispatch(fetchSingleProduct({productid}));
  }, []);

  function addProductToWishlist(product) {
    dispatch(addToWishlist({product}));
    handleOpen();
  }

  function addProductToCart (product) {
    dispatch(addTOCart({product, quantity:1}));
  }

  function navigateToHome() {
    navigate('/');
  }
    
  return (
    <>
    <Container maxWidth='lg' sx={{pt:{xs: theme.spacing(4), md: theme.spacing(12)}, pb:theme.spacing(15), position: 'relative'}}>
    {loading ? <CircularProgress sx={{position: 'fixed', top: '40%', left: '45%', zIndex: '10'}} /> :
      <>
      <Fade in={open}>
        <Box sx={{position: 'relative', width:'100%', zIndex:100}}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            pt:'500px',
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

      <IconButton onClick={navigateToHome} sx={{position: 'absolute', top: '30px', left: {xs: '10px', md:'20px'}, zIndex: '100'}} >
        <ChevronLeftRoundedIcon fontSize='large'/>
      </IconButton>
      <Grid container item >
      <Grid item container xs={12} md={6} >
          <Box sx={{ position: 'relative', margin: 'auto'}}>
            <IconButton 
                  sx={{position: 'absolute', right: '0px',top : '5px', zIndex: '10'}} 
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
            <Paper elevation={2} sx={{padding: { sm: '20px', lg: '40px'}}} >
              <IconButton onClick={handlePrevImage} sx={{position: 'absolute', top: '40%', left: {xs: '-35px', sm:'-60px'}}}>
                <NavigateBeforeRoundedIcon/>
              </IconButton>
              <IconButton onClick={handleNextImage} sx={{position: 'absolute', top: '40%', right: {xs: '-35px', sm:'-60px'}}}>
                <NavigateNextRoundedIcon />
              </IconButton>
              <CardMedia
                component='img'
                image={imageList[currentIndex]}
                alt={title}
                sx={{
                  alignSelf:'center', 
                  width:{xs : theme.spacing(30), sm : theme.spacing(40)}, 
                  height:{xs : theme.spacing(30), sm : theme.spacing(40)}, 
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
              <Typography sx={{color: '#6c757d' ,fontWeight: '400'}} >Brand : <Typography variant='span' sx={{fontWeight: '500', px: '10px', color: '#343a40'}}>{brand}</Typography></Typography>
              <Typography variant='span' sx={{color: '#6c757d' ,fontWeight: '400'}} >Availability : {stock > 0 ? <Typography variant='span' color='#006400' sx={{fontWeight: '500', px: '10px'}} >- In Stock -</Typography> : <Typography variant='span' sx={{fontWeight: '500', px: '10px'}} color='error'>- Out Of Stock -</Typography>}</Typography> 
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
      </>}
    </Container>
    </>
  )
}
