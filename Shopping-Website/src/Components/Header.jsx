import { AppBar, Badge, Button, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react'
import { Box } from '@mui/system';

const Header = () => {
  return (
    <AppBar sx={{position: 'sticky'}}>
        <Toolbar>
            <Typography 
                variant='h6'
                color='inherit'
                sx={{
                    flexGrow: 1,
                }}
            >
                ShopMore
            </Typography>
            <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
                <IconButton 
                size='large' 
                aria-label='shows cart item count' 
                color='inherit'
                sx={{
                    margin:'10px',
                    padding:'10px'
                }}>
                    <Badge badgeContent={1} color="error">
                        <ShoppingCartOutlinedIcon/>
                    </Badge>
                </IconButton>
            </Box>
        <Button color='inherit'>LogIn</Button>
        </Toolbar>
    </AppBar>
  )
}

export default Header