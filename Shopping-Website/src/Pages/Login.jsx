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
import { Form, useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/Auth';


const Login = () => {

  const theme = useTheme();
  const navigate = useNavigate()
  const { signIn } = useAuth();

  function navigateRegister() {
    navigate('/register');
  }

  const login = async (event) => {
    event.preventDefault();
    const {email, password} = event.target;

    try{
      await signIn(email.value, password.value);
      navigate('/');
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
          mx: '20px'
        }}>
        <Avatar sx={{
          m: 1,
          backgroundColor: theme.palette.secondary.main
          }}
        >
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component={'h1'} variant='h5' sx={{fontWeight:500}}>Sign In</Typography>
        <Box sx={{mt:2}}>
          <Form onSubmit={login} 
            sx={{
              width: '100%'
            }}>
            <TextField 
              label='Email'
              variant='outlined' 
              margin='normal' 
              required 
              fullWidth 
              id='email' 
              name='email' 
              type='email' 
              autoFocus 
              autoComplete='off'
              >

            </TextField>
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
            <Button type='submit' variant='contained' fullWidth color='primary' sx={{
              margin: theme.spacing(3,0,2)
            }}>Sign In</Button>

          </Form>
        </Box>
        <Grid container justifyContent={'flex-end'} >
          <Grid item >
              <Link variant='body2' onClick={navigateRegister} sx={{fontSize:'14px'}}>New User? Sign Up</Link>
          </Grid>
        </Grid>

      </Box>
    </Container>
  )
}

export default Login