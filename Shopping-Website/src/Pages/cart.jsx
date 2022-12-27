import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, useTheme, Rating, TextField, Button } from '@mui/material';
import { Box } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { getSubTotal } from '../utils';
import { addTOCart, removeFromCart } from '../feature/Cart-slice';

export default function cart() {

  const cart = useSelector((state) => state.cart?.value);
  const theme = useTheme();
  const subTotal = getSubTotal(cart)?.toFixed(2);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/');
  }

  const checkOutItems = () => {
    navigate('/checkout');
  }

  function updateQuantity(e, { product, quantity}) {
    const updatedQuantity = e.target.valueAsNumber;
    if(updatedQuantity < quantity) {
      dispatch(removeFromCart({ product }))
    }
    else {
      dispatch(addTOCart({ product }))
    }
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cart?.map(({product, quantity}) => {
            const {title, id, rating, images} = product;
            return <Grid item key={id} xs={12}>
              <Card 
                sx={{
                  display:'flex',
                  py: 2,
                  px: 2
                  }}>
                <CardMedia 
                  component='img' 
                  image={images[0]} 
                  alt={title} 
                  sx={{
                    width: theme.spacing(30),
                    height: theme.spacing(30),
                    objectFit: 'contain',
                    pt: theme.spacing()
                  }} 
                />
                <CardContent sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex:1
                }}>
                  <Box 
                    sx={{
                      display:'flex',
                      flexDirection:'column',
                      gap:2
                    }}
                  >
                    <Typography variant='h5' sx={{
                      fontSize:'35px',
                      marginRight: '30px'
                    }}>
                      {title}
                    </Typography>
                    <Rating readOnly precision={0.5} value={rating}/>
                    <Form>
                      <TextField 
                        id={`${id}-product_id`}
                        type='number'
                        label='quantity' 
                        variant='standard'
                        value={quantity} 
                        inputProps={{
                          min:0,
                          max:10
                        }}
                        sx={{
                          width:theme.spacing(8)
                        }}
                        onChange={(e) => updateQuantity(e, { product, quantity})}
                        >
                      </TextField>
                    </Form>
                  </Box>
                  <Box>
                    <Typography variant='h5' paragraph sx={{
                      fontSize:'25px'
                    }}>
                      ${getSubTotal([{product, quantity}]).toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          })}
        </Grid>
        <Grid item md={4} sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
          }}>
          <Card sx={{
            padding: '20px',
            width: '100%',
            height:'180px'
          }}>
            <Box sx={{
              padding:2,
              display: 'flex',
              flexDirection: 'column',
              gap:2
            }}>
              <Typography variant='h4' sx={{fontSize:'20px'}}>Subtotal</Typography>
              <Typography variant='h4' sx={{fontSize:'20px'}}>${subTotal}</Typography>
              { subTotal > 0 ? <Button variant='contained' onClick={checkOutItems}>Buy Now</Button> : <Button variant='contained' onClick={goToHome}>Shop Products</Button> }
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}


