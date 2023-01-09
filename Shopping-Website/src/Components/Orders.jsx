import React from 'react';
import { Typography, List, ListItem, ListItemText, Grid, useTheme, Box, IconButton, Container, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { getSubTotal } from '../utils';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate } from 'react-router-dom';

export default function Review() {

  const fullData = useSelector((state) => state.checkout.allData);
  const { cart } = fullData;
  const { fullAddress } = fullData;
  const navigate = useNavigate();
  console.log(fullData);
  const theme = useTheme();

  function navigateToMyAccount() {
    navigate('/account');
  };

  function navigateHome() {
    navigate('/');
  };

  return (
  <>
    {fullData.cart ? 
    <>
      <Container maxWidth='lg' sx={{position: 'relative'}} >
        <IconButton onClick={navigateToMyAccount} sx={{position: 'absolute', top: '30px', left: '20px'}} >
          <ChevronLeftRoundedIcon fontSize='large'/>
        </IconButton>
        <Container maxWidth='md' sx={{pt: '90px'}}>
            <Box sx={{pt: '20px', pb: '100px', px: {xs: '30px', sm: '40px'}}} >
              <Typography variant='h6' gutterBottom>
                Last Order Summary :
              </Typography>
              <List disablePadding>
                {cart?.map(({ product, quantity}) => (
                  <ListItem key={product.title} sx={{ py:1, px:0}}>
                    <ListItemText sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight:500
                      },
                      '& .MuiListItemText-secondary': {
                        fontSize: theme.spacing(2)
                      }

                    }} primary={product.title} secondary={`Qty: ${quantity}`}/>
                    <Typography variant='body2'>${getSubTotal([{product, quantity}])?.toFixed(2)}</Typography>
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText primary='Total' />
                  <Typography variant='subtitle1' sx={{
                    mt:2,
                    fontWeight:700
                  }} 
                  >${getSubTotal(cart).toFixed(2)}</Typography>
                </ListItem>
              </List>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant='h6' gutterBottom sx={{
                    mt:2
                  }} >Shipping Address:</Typography>
                  <Typography gutterBottom>{fullAddress}</Typography>
                </Grid>
                {/* <Grid item container direction='column' xs={12} sm={6}>
                  <Typography variant='h6' sx={{mt:2}}>Payment Details:</Typography>
                  <Grid container ></Grid>
                </Grid> */}
              </Grid>
            </Box>
        </Container>
      </Container>
    </> : 
      <Container maxWidth='lg' sx={{position: 'relative'}} >
        <IconButton onClick={navigateToMyAccount} sx={{position: 'absolute', top: '30px', left: '20px'}} >
          <ChevronLeftRoundedIcon fontSize='large'/>
        </IconButton>
        <Container maxWidth='md' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', py: '200px', flexDirection: 'column' }} >
        <Typography variant='h6' gutterBottom>No Previous Order(s)</Typography>
        <Button onClick={navigateHome}>Shop Now</Button>
        </Container>
      </Container>
    }
      
  </>
  )
}
