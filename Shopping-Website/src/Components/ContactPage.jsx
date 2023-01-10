import React from 'react';
import { Box, Button, Grid, Typography, IconButton, TextField } from '@mui/material';
import { Container } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactPage() {

    const navigate = useNavigate();
    const [state, handleSubmit] = useForm("myyayler");

    function navigateToMyAccount() {
        navigate('/account');
    };

    if (state.succeeded) {
        return (
            <>
            <Container maxWidth='lg' sx={{position: 'relative', pb: '100px'}} >
                <IconButton onClick={navigateToMyAccount} sx={{position: 'absolute', top: '30px', left: '20px'}} >
                    <ChevronLeftRoundedIcon fontSize='large'/>
                </IconButton>
                <Container maxWidth='sm' sx={{pt: '90px', px: {xs: '20px', sm: '40px'}}} >
                    <Box py={5} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection:'column'
                    }}>
                        <Typography variant='h6' sx={{fontSize: '40px', px:'10px',color: '#e63946',textAlign : 'center'}}>Thank you.</Typography>
                        <Typography variant='h6' sx={{fontSize: '20px', px:'10px',textAlign : 'center'}}>Your message has being delivered.</Typography>
                    </Box>
                </Container>
            </Container>
            </>
        )
    }

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
            <Box sx={{pb:4}} component={'form'} onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: '20px', px: '2px'}} >
                    <TextField
                    autoComplete='off'
                    id="name-input"
                    label='Name'
                    defaultValue=''
                    required 
                    name='name' 
                    type='text'  
                    sx={{
                        width:'100%'
                    }}
                    autoFocus
                    />
                    <ValidationError 
                        prefix="Name" 
                        field="name"
                        errors={state.errors}
                    />
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: '20px', px: '2px'}} >
                    <TextField
                    autoComplete='off'
                    id="email-input"
                    label='Email Id'
                    defaultValue=''
                    required 
                    name='email' 
                    type='email'  
                    sx={{
                        width:'100%'
                    }}
                    />
                    <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
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
                        required 
                        name='message' 
                        type='text'  
                    />
                    <ValidationError 
                        prefix="Message" 
                        field="message"
                        errors={state.errors}
                    />
                </Box>
                <Box sx={{pt: '30px'}} >
                    <Button fullWidth variant='contained' color='success' type='submit' disabled={state.submitting}>Send Mail</Button>
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
