import { Typography, Box, Grid, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../feature/Checkout-slice';


export default function PaymentForm() {

    const payment = useSelector((state) => {state.checkout?.payment});
    const dispatch = useDispatch();

    function handleChange(event) {
        const { name, value} = event.target;
        dispatch(updatePayment({[name] : value}));
    }

  return (
    <>
    <Typography variant='h6' gutterBottom>
        Payment Method :
    </Typography>
    <Box component='form' onChange={handleChange}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <TextField defaultValue={payment?.name ?? ''} name='name' id='name' variant='standard' required label='Name On Card' fullWidth autoComplete='cc-name' autoFocus/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField defaultValue={payment?.cardNumber ?? ''} name='cardNumber' id='cardNumber' variant='standard' required label='Card Number' fullWidth autoComplete='cc-number'/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField defaultValue={payment?.expDate ?? ''} name='expDate' id='expDate' variant='standard' required label='Expiry Date' fullWidth autoComplete='cc-exp'/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField defaultValue={payment?.cvv ?? ''} name='cvv' id='cvv' variant='standard' required label='CVV' fullWidth type='password' autoComplete='cc-csc'/>
            </Grid>
        </Grid>
    </Box>
    </>
  )
}
