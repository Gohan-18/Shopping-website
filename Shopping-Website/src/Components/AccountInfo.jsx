import React from 'react';
import { useAuth } from '../firebase/Auth';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AccountInfo() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }}>
        {user ? <h1>Account Info</h1> : <Button variant='contained' sx={{mt:10}} onClick={handleLogin}>LogIn</Button>}
    </Box>
  )
}
