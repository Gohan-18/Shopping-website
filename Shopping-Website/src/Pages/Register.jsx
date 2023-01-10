import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseLine from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/Auth';

export default function Register() {

    const theme = useTheme();
    const navigate = useNavigate()
    const { signUp } = useAuth();
  
    const registerUser = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try{
            await signUp(data.get('email'), data.get('password'), data.get('name'));
            navigate('/login');
        }
        catch(e){
            const error = JSON.stringify(e);
            const {code} = JSON.parse(error);
            alert(code.slice(5).toUpperCase());
        }
    }

  return (
    <Container component={'main'} maxWidth='xs'>
    <CssBaseLine/>
    <Box 
      sx={{
        mt: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: '20px'
      }}>
        <Avatar sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main
            }}>
            <LockOutlinedIcon/>
        </Avatar>
        <Typography component={'h1'} variant='h5' sx={{fontWeight:500}}>Sign Up</Typography>

        <Box component={'form'} onSubmit={registerUser}>
            <Grid container sx={{mt:1}}>
                <Grid item xs={12}>
                    <TextField 
                        label='Name'
                        variant='outlined' 
                        margin='normal' 
                        required 
                        fullWidth 
                        id='name' 
                        name='name' 
                        type='text' 
                        autoFocus 
                        autoComplete='off'
                    >
                    </TextField>
                </Grid>    
                <Grid item xs={12}>    
                    <TextField 
                    label='Email'
                    variant='outlined' 
                    margin='normal' 
                    required 
                    fullWidth 
                    id='email' 
                    name='email' 
                    type='email'  
                    autoComplete='off'
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                    label='Password'
                    variant='outlined' 
                    margin='normal' 
                    required 
                    fullWidth 
                    id='password' 
                    name='password' 
                    type='password'  
                    autoComplete='current-password'
                    >
                    </TextField>
                </Grid>
            </Grid>
            <Button type='submit' variant='contained' fullWidth color='primary' sx={{mt:3, mb:2}}
                >Register
            </Button>
        </Box>
        <Grid container justifyContent={'flex-end'} >
            <Grid item >
                <Link variant='body2' href='/login' sx={{fontSize:'14px'}}>Already have an account? Sign In</Link>
            </Grid>
        </Grid>
    </Box>
  </Container>
  )
}