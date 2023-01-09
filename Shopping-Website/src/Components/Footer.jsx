import { BottomNavigation, BottomNavigationAction, Paper, IconButton, Badge } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItemCount } from '../utils';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';

export default function Footer() {

    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.value);
    const count = getItemCount(cartItems);
    const searchParam = location.href.split('/').pop();

    useEffect(() => {
        if(searchParam === 'wishlist' || searchParam === 'profile' || searchParam === 'account' || searchParam === 'orders' || searchParam === 'contact') {
            setValue(1);
        }
        if(searchParam === '') {
            setValue(0);
        }
    }, [searchParam]);

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToAccount = () => {
        navigate('/account')
    }

    const navigateToCart = () => {
        navigate('/cart')
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: 2,
          top: 5,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

  return (
    <Box>
        <Paper sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            py: 1,
            display: {
                xs: 'block',
                sm: 'none'
            }
        }}
        elevation={3}
         >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction onClick={navigateToHome} label="Home" icon={<HomeRoundedIcon />} />
                <BottomNavigationAction onClick={navigateToAccount} label="Account" icon={<AccountCircleRoundedIcon />} />
                <BottomNavigationAction onClick={navigateToCart} label="Cart" icon={
                    <StyledBadge badgeContent={count} color="error" >
                        <ShoppingCartRoundedIcon />
                    </StyledBadge>
                }/>
            </BottomNavigation>
        </Paper>
    </Box>
  )
}
