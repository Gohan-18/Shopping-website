import React from 'react';
import Box from '@mui/system/Box';
import { Container, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../Components/AddressForm';
import PaymentForm from '../Components/PaymentForm';
import ReviewForm from '../Components/ReviewForm';
import { useDispatch } from 'react-redux';
import { clearCart } from '../feature/Cart-slice';
import { clearAddress, saveDetails } from '../feature/Checkout-slice';
import { useSelector } from 'react-redux';

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];


function getStepContent (activeStep) {
  switch(activeStep){
    case 0: return <AddressForm/>
    case 1: return <PaymentForm/>
    case 2: return <ReviewForm/>
    default: throw new Error('Unknown Step');
  }
}

export default function Checkout() {

  const [activeStep, setactiveStep] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart.value);
  const address = useSelector((state) => state.checkout?.address);
  const addresses = address ? Object.values(address) : [];
  const fullAddress = addresses.join(', ')
  const payment = useSelector((state) => state.checkout?.payment);

  useEffect(() => {
    if(activeStep === steps.length) {
      dispatch(saveDetails({fullAddress, cart}))
      dispatch(clearCart());
      dispatch(clearAddress());
    }
  }, [activeStep]);

  function shopMoreBtnHandler() {
    navigate('/');
  }

  function handleNext () {
    setactiveStep( activeStep + 1 );
  }

  function handleBack () {
    setactiveStep( activeStep - 1 );
  }

  return (
    <Container component='section' maxWidth='lg' 
      sx={{
        mb:{
          xs: 10,
          sm: 4
      }}}>
      <Paper varient='outlined' sx={{ my : { xs:3, md:6 }, p: { xs:2, md:3 }} }>
        <Typography component='h1' varient='h4' sx={{fontSize:'30px', fontWeight: '500'}} align='center'>Checkout</Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{
          pt:3, 
          pb:5
        }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <>
          <Typography variant='h5'>Thank you for your order</Typography>
          <Typography sx={{mt:1}} >Your order number is #333253RG44. We have sent an Email to you regarding the order confirmation...</Typography>
          <Button onClick={shopMoreBtnHandler} sx={{mt:2, padding:'5px 10px'} }>Shop For More Items</Button>
          </>
          ) : (
          <>
          {getStepContent(activeStep)}
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            {activeStep !== 0 && <Button onClick={handleBack} variant='contained' 
              sx={{ margin:1, mt:3 }}
            >Back</Button>}

            <Button onClick={handleNext} variant='contained' 
              sx={{ margin:1, mt:3 }}
            >{activeStep !== steps.length-1 ? 'Next' : 'Place Order' }</Button>

          </Box>
          </>
        )}
      </Paper>
    </Container>
  )
} 
