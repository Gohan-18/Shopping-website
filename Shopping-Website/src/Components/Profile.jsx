import { Typography } from '@mui/material';
import { Box, Container, TextField, Button, IconButton } from '@mui/material';
import React from 'react';
import { useAuth } from '../firebase/Auth';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut();
    navigate('/login');
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
    <Container maxWidth='sm' sx={{pt: '50px'}} >
        <Box pt={6} pb={6} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant='h6' sx={{fontSize: '32px', borderBottom: '3px solid black', px:'10px'}}>Profile Details</Typography>
        </Box>
        <Box sx={{pb:6, px:{ xs :'20px', sm: '0'}}}>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: '20px'}} >
            <TextField
              id="standard-read-only-input"
              label='Name'
              defaultValue={user.displayName}
              InputProps={{
                readOnly: true,
              }}
              // variant="standard"
              sx={{
                width:'100%'
              }}
            />
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} >
            <TextField
              id="standard-read-only-input"
              label='Email Id'
              defaultValue={user.email}
              InputProps={{
                readOnly: true,
              }}
              // variant="standard"
              sx={{
                width:'100%'
              }}
            />
          </Box>
        </Box>
        <Container maxWidth='sm' sx={{position: 'fixed', bottom: 100, left:0, right:0}}>
          <Button fullWidth variant='contained' color='error' onClick={logOut}>LogOut</Button>
        </Container>
    </Container>
    </Container>
    </>
  )
}
