import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress } from '../feature/Checkout-slice';




export default function AddressForm() {

    const address = useSelector((state) => state.checkout?.address);
    const dispatch = useDispatch();

    function handleChange(event) {
        const { name, value} = event.target;
        dispatch(updateAddress({[name] : value}));
    }

  return (
    <>
    <Typography variant='h6' gutterBottom>
        Shipping Address :
    </Typography>
    <Box component='form' onChange={handleChange}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField defaultValue={address.firstName ?? ''} required type='text' id='firstName' label='First Name' name='firstName' autoFocus fullWidth variant='standard' autoComplete='given-name'/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField defaultValue={address.lastName ?? ''} required type='text' id='lastName' label='Last Name' name='lastName' fullWidth variant='standard' autoComplete='family-name'/>
            </Grid>
            <Grid item xs={12}>
                <TextField defaultValue={address.address1 ?? ''} required type='text' id='address1' label='Address Line 1' name='Address1' fullWidth variant='standard' autoComplete='shipping address-line1'/>
            </Grid>
            <Grid item xs={12}>
                <TextField defaultValue={address.address2 ?? ''} required type='text' id='address2' label='Address line 2' name='Address2' fullWidth variant='standard' autoComplete='shipping address-line2'/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField defaultValue={address.city ?? ''} required type='text' id='city' label='City Name' name='city' fullWidth variant='standard' autoComplete='city name'/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField required defaultValue={address.zipCode ?? ''} type='text' id='zipCOde' label='Zip/Postal Code' name='zipCode' fullWidth variant='standard' autoComplete='zip code'/>
            </Grid>
            <Grid item xs={12}>
                <TextField defaultValue={address.country ?? ''} required type='text' id='country' label='Country' name='country' fullWidth variant='standard' autoComplete='country-name'/>
            </Grid>
        </Grid>
    </Box>
    </>
  )
}