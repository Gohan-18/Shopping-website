import { Typography, Container, Box, CardMedia, useTheme, Button } from '@mui/material';
import ErrorImage from '../assets/404-error.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {

    const theme = useTheme();
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    }

  return (
    <>
    <Container maxWidth='md'>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pt: '80px'}} >
            <CardMedia
                component='img'
                image={ErrorImage}
                alt='ERROR 404'
                sx={{
                  alignSelf:'center', 
                  width:{xs: theme.spacing(35), sm: theme.spacing(50)}, 
                  height:{xs: theme.spacing(35), sm: theme.spacing(50)}, 
                  objectFit:'contain'
                }}
            />
            <Button onClick={navigateHome} sx={{mt:'10px'}} >HOME</Button>
        </Box>
    </Container>
    </>
  )
}
