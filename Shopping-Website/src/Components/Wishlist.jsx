import { useTheme } from '@emotion/react';
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography, CardActions, Button, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTOCart } from '../feature/Cart-slice';
import { removeFromWishlist } from '../feature/Wishlist-slice';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export default function Wishlist() {

  const productState = useSelector((state) => state.products);
  const { value: product, loading} = productState ?? {};
  const state = useSelector((state) => state.wishlist?.list);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function removeWishlist({product}) {
    dispatch(removeFromWishlist({ product }));
  };

  function addProductToCart (product) {
    dispatch(addTOCart({product, quantity:1}));
    removeWishlist({product});
  };

  function navigateToHome() {
    navigate('/');
  };

  function navigateToMyAccount() {
    navigate('/account');
  };


  return (
    <>
    <Container maxWidth='lg' sx={{position: 'relative'}} >
      <IconButton onClick={navigateToMyAccount} sx={{position: 'absolute', top: '30px', left: '20px'}} >
        <ChevronLeftRoundedIcon fontSize='large'/>
      </IconButton>
      <Container maxWidth='md' sx={{pt:15, pb:{xs:13, sm:8, md:6}}}>

        <Grid container spacing={2}>

          {state.length > 0 ? state.map(({product}) => {
            const {title, id, price, discountPercentage, description, rating , images} = product;
            
            return( 
              <Grid item key={id} xs={6} sm={6}>
                <Card sx={{height:'100%', display: 'flex' , flexDirection:'column'}}>
                  <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>

                    <IconButton 
                      sx={{
                        position: 'absolute', 
                        top : {xs: 5, sm: 10, md: 15}, 
                        right: {xs: 5, sm: 10, md: 15},
                        opacity: '0.5', 
                        fill: '#6c757d'
                      }} 
                      onClick={() => removeWishlist({product}) 
                      }>
                      <CancelRoundedIcon 
                        fontSize='small' 
                        sx={{
                          '&:hover': {
                            fill: '#e63946'
                          }
                        }} 
                          
                        />
                      </IconButton>

                    <CardMedia
                        component='img' 
                        image={images[0]} 
                        alt={title} 
                        sx={{
                          width: {
                            xs: theme.spacing(18),
                            sm: theme.spacing(24),
                          },
                          height: {
                            xs: theme.spacing(18),
                            sm: theme.spacing(24),
                          },
                          objectFit: 'contain',
                          pt: theme.spacing()
                        }} 
                      />
                  </Box>

                  <CardContent >
                    <Typography 
                      gutterBottom 
                      sx={{
                        fontSize:{ 
                          xs:'15px', 
                          sm: '20px', 
                          md: '25px' 
                        }, 
                        fontWeight: '500',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                      }}>{title}</Typography>
                    <Typography sx={{fontSize: { xs:'14px', sm: '20px' }}} component='span'>${price}</Typography>
                    <Typography sx={{fontSize:{ xs:'11px', sm: '15px' }, ml: 1, color: '#e63946'}} component='span'>({discountPercentage}% OFF)</Typography>
                  </CardContent>

                  <CardActions 
                    sx={{
                      alignSelf:'center',
                      alignContent:'center',
                      width: '100%',
                      // marginBottom:'20px'
                      borderTop: '2px solid #edede9'
                    }}>
                      <Button sx={{margin: 'auto', fontSize: {xs :'14px', sm: '18px'}}}  onClick={() => addProductToCart({title, id, price, images, description, rating }) }>
                        Move to cart
                      </Button>
                  </CardActions>

                </Card>
              </Grid>
          )}): 
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh', width: '100vw'}}>
            <Typography component='h4' sx={{fontSize: '25px', fontWeight: '500'}}>No Item in the Wishlist!!</Typography>
            <Button onClick={navigateToHome} sx={{mt:1, fontSize: '20px'}} >ADD</Button>
          </Box>
          }

        </Grid>
      </Container>
    </Container>
    </>
  )
}
