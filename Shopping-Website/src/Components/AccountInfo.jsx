import React from 'react';
import { useAuth } from '../firebase/Auth';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AccountInfo() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const AccountInfo = () => (
        <>
        <Typography>Account Info</Typography>
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
