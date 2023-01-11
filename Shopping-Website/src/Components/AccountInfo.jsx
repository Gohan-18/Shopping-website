import React from 'react';
import { useAuth } from '../firebase/Auth';
import { Box, Button, Grid, Typography, styled, Paper, IconButton, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';

export default function AccountInfo() {

    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const logOut = async () => {
        await signOut();
        navigate('/login');
    }

    function navigateToHome() {
        navigate('/');
      };

    function navigateProfile() {
        navigate('/profile');
    }

    function navigateOrders() {
        navigate('/orders');
    }

    function navigateWishlist() {
        navigate('/wishlist');
    }

    function navigateContactMe() {
        navigate('/contact');
    }

    

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.primary,
      }));

    const AccountInfo = () => (
        <>
      <Container maxWidth='lg' sx={{position: 'relative'}} >
        <IconButton onClick={navigateToHome} sx={{position: 'absolute', top: '30px', left: '20px'}} >
          <ChevronLeftRoundedIcon fontSize='large'/>
        </IconButton>
        <Container maxWidth='sm' sx={{pt: '50px'}} >
            <Box py={5} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant='h6' sx={{fontSize: '32px', borderBottom: '3px solid black', px:'10px'}}>My Account</Typography>
            </Box>
            <Box sx={{pb:6}}>
                
                <Grid container spacing={4} >
                
                    <Grid item xs={6} >
                    <CardActionArea>
                        <Item sx={{ display:'flex',alignItems: 'center', justifyContent: 'center',  gap:2, cursor: 'pointer', fontWeight:500}} elevation={1} onClick={navigateProfile}><PersonOutlineRoundedIcon/>Profile</Item>
                    </CardActionArea>
                    </Grid>
                    <Grid item xs={6} >
                    <CardActionArea>
                        <Item sx={{ display:'flex',alignItems: 'center', justifyContent: 'center',  gap:2, cursor: 'pointer', fontWeight:500}} elevation={1} onClick={navigateOrders}><ShoppingCartCheckoutRoundedIcon/> Orders</Item>
                    </CardActionArea>
                    </Grid>
                    <Grid item xs={6} >
                    <CardActionArea>
                        <Item sx={{display:'flex',alignItems: 'center', justifyContent: 'center', gap:2, cursor: 'pointer', fontWeight:500}} elevation={1} onClick={navigateWishlist}><FavoriteBorderRoundedIcon/> Wishlist</Item>
                    </CardActionArea>
                    </Grid>
                    <Grid item xs={6} >
                    <CardActionArea>
                        <Item sx={{display:'flex',alignItems: 'center', justifyContent: 'center', gap:2, cursor: 'pointer', fontWeight:500}} elevation={1} onClick={navigateContactMe}><ContactMailOutlinedIcon/> Contact</Item>
                    </CardActionArea>
                    </Grid>
                </Grid>
                
            </Box>
            <Container maxWidth='sm' sx={{position: 'fixed', bottom: 100, left:0, right:0}}>
                <Button fullWidth variant='contained' color='error' onClick={logOut}>LogOut</Button>
            </Container>
        </Container>
        </Container>
        </>
    )

  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }}>
        {user ? <AccountInfo/> : <Button variant='contained' sx={{mt:10}} onClick={handleLogin}>LogIn</Button>}
    </Box>
  )
}
