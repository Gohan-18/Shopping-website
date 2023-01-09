import React from 'react';
import { Box, Button, Grid, Typography, IconButton, TextField } from '@mui/material';
import { Container } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {

    const navigate = useNavigate();

    function sendMail (e) {
        e.preventDefault();
        
    }

    function navigateToMyAccount() {
        navigate('/account');
      };

  return (
    <>
    <Container maxWidth='lg' sx={{position: 'relative', pb: '100px'}} >
      <IconButton onClick={navigateToMyAccount} sx={{position: 'absolute', top: '30px', left: '20px'}} >
        <ChevronLeftRoundedIcon fontSize='large'/>
      </IconButton>
        <Container maxWidth='sm' sx={{pt: '50px', px: {xs: '20px', sm: '40px'}}} >
            <Box py={5} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant='h6' sx={{fontSize: '32px', borderBottom: '3px solid black', px:'10px'}}>Contact Me</Typography>
            </Box>
            <Box sx={{pb:4}} component='form'>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: '20px', px: '2px'}} >
                    <TextField
                    autoComplete='off'
                    id="name-input"
                    label='Name'
                    defaultValue=''
                    InputProps={{
                        readOnly: false,
                    }}
                    sx={{
                        width:'100%'
                    }}
                    autoFocus
                    />
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: '20px', px: '2px'}} >
                    <TextField
                    id="email-input"
                    label='Email Id'
                    defaultValue=''
                    InputProps={{
                        readOnly: false,
                    }}
                    sx={{
                        width:'100%'
                    }}
                    />
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', px: '2px'}} >
                    <TextField
                        multiline
                        minRows={5}
                        maxRows={5}
                        id="message-input"
                        label='Message'
                        defaultValue=''
                        sx={{
                            width:'100%',
                        }}
                    />
                </Box>
                <Box sx={{pt: '30px'}} >
                    <Button onClick={sendMail} fullWidth variant='contained' color='success' type='submit'>Send Mail</Button>
                </Box>
            </Box>
        </Container>
        {/* <Container maxWidth='sm' >
            <Button fullWidth variant='contained' color='success'>Send Mail</Button>
        </Container> */}
      </Container>
      </>
  )
}
