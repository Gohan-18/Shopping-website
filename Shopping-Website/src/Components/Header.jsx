import { AppBar, Badge, Button, IconButton, Menu, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getItemCount } from '../utils';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fetchAllCategories } from '../feature/Category-slice';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../firebase/Auth';

const Header = () => {

    const [anchorEl, setanchorEl] = useState(null)
    const { user, signOut } = useAuth();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.value);
    const count = getItemCount(cartItems);
    const theme = useTheme();
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);

    const navigateToLoginPage = () => {
        navigate('/login');
    }

    const navigateTocart = () => {
        navigate('/cart')
    }

    const Search = styled('section')(({theme}) => ({
        position:'relative',
        borderRadius:theme.shape.borderRadius,
        display:'flex',
        backgroundColor:alpha(theme.palette.common.white,0.15),
        '&hover':{
            backgroundColor:alpha(theme.palette.common.white,0.25)
        },
        marginRight:theme.spacing(2),
        marginLeft:theme.spacing(1),
        width:'100%'
    }))

    const StyleAutocomplete = styled(Autocomplete)(({theme}) => ({
        color:'inherit',
        width:'100%',
        '& .MuiTextField-root': {
            paddingRight:`calc(1em + ${theme.spacing(4)})`
        },
        '& .MuiInputBase-input': {
            color: theme.palette.common.white
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border:'none'
        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.common.white
        }
    }));

    const SearchIconWrapper = styled('section')(({theme}) => ({
        padding: theme.spacing(0,2),
        height: '100%',
        position: 'absolute',
        right: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }));

    const StyleLink = styled(Link)(({theme}) => ({
        color: theme.palette.common.white,
        textDecoration: 'none'
    }));

    const SearchBar = () => {
        const theme = useTheme();
        const [selectedCategory, setSelectedCategory] = useState('');
        const navigate = useNavigate();
        const categoriesItems = useSelector((state) => state.categories?.value);
        const products = useSelector((state) => state.products?.value);
        const [selectedProduct, setselectedProduct] = useState(null)

        const [searchParams ] = useSearchParams();
        const category = searchParams.get('category');
        const searchTerm = searchParams.get('searchTerm');

        useEffect (() => {
            setSelectedCategory(category ? category : 'all');
        }, [category]);
        

        if(!categoriesItems.length) {
            dispatch(fetchAllCategories());
        }

        const handleCategoryChange = (e) => {
            const { value } = e.target;
            navigate(value === 'all' ? '/' : `/?category=${value}${searchTerm? '&searchterm='+searchTerm : ''}`);
        }

        const handleSearchChange = (searchText) => {
            if(searchText) {
                navigate(selectedCategory === 'all' ? `?searchterm=${searchText}`:`/?category=${selectedCategory}&searchterm=${searchText}`);
            }
            else {
                navigate(selectedCategory === 'all' ? `/`:`/?category=${selectedCategory}`);
            }
        }

        return (
        <Search >
            <Select
            value={selectedCategory}
            size='small'
            sx={{
                textTransform:'capitalize',
                m:'1',
                '&':{
                    '::before':{
                        border:'none'
                    }
                },
                '::before, &::after': {
                    border:'none'
                },
                padding:'5px 20px',
                margin:'0 10px',
                '.MuiSelect-standard':{
                    color:'common.white'
                },
                '.MuiSelect-icon':{
                    fill: theme.palette.common.white
                }
            }}
            variant='standard'
            label='selected-catagory-id'
            labelId='selected-catagory'
            onChange={handleCategoryChange}>
                <MenuItem value='all'>
                    All
                </MenuItem>
                {categoriesItems.map((category) => (
                    <MenuItem sx={{
                        textTransform:'capitalize'
                    }} key={category} value={category}>{category}</MenuItem>
                ))}
            </Select>
            <StyleAutocomplete
                freeSolo
                id='selected-product'
                value={selectedProduct}
                onChange={(e, value) => {
                    handleSearchChange(value?.label);
                }}
                disablePortal
                options={Array.from(selectedCategory === 'all' ? products : products.filter(((prod) => prod.category === selectedCategory)), (prod) => ({id: prod.id, label: prod.title}))}
                renderInput={(params) => <TextField {...params} />}
            />
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
        </Search>)
    }

    function handleProfileMenuOpen(e) {
        setanchorEl(e.currentTarget);
    }

    function handleMenuCLose() {
        setanchorEl(null);
    }

    async function logOut () {
        await signOut();
        navigate('/login');
    }

    const navigateToAccount = () => {
        navigate('/account');
        setanchorEl(null);
    }

    const navigateToProfile = () => {
        navigate('/profile');
        setanchorEl(null);
    }

    const renderMenu = (
        <Menu 
            anchorEl={anchorEl} 
            id='user-profile-menu' 
            keepMounted 
            transformOrigin={{
                horizontal: 'right',
                vertical: 'top'
            }} anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom'
            }}
            open={isMenuOpen}
            onClose={handleMenuCLose} 
        >
            <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
            <MenuItem onClick={navigateToAccount}>My Account</MenuItem>
            <MenuItem onClick={logOut}>Log Out</MenuItem>
        </Menu>
    );

  return (
    <>
        <AppBar            
            position= 'sticky' 
            sx={{
                padding:3,
                display: {
                    xs: 'flex',
                    sm: 'none'
                },
                justifyContent: 'center',
                alignItems: 'center'
            }}><SearchBar/>
        </AppBar> 
        <AppBar
            position= 'sticky' 
            sx={{
                py:1,
                display: {
                    xs: 'none',
                    sm: 'flex'
                }
            }}>
            <Toolbar sx={{
                display: 'flex',
                gap: 2
            }}>
                <Typography 
                    variant='h6'
                    color='inherit'
                    sx={{
                        margin:'0 10px 0 0'
                    }}
                >
                    <StyleLink to='/'>ShopMore</StyleLink>
                </Typography>
                <SearchBar/>
                <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
                    <IconButton 
                        onClick={navigateTocart}
                        size='large' 
                        aria-label='shows cart item count' 
                        color='inherit'
                        sx={{
                            margin:'10px',
                            padding:'10px'
                        }}>
                        <Badge badgeContent={count} color="error">
                            <ShoppingCartOutlinedIcon sx={{
                                fill: theme.palette.common.white
                            }} />
                        </Badge>
                    </IconButton>
                    {user ? (<Button onClick={handleProfileMenuOpen} color='inherit'>Hello, {user?.displayName ?? user.email}</Button>) : (<Button onClick={navigateToLoginPage} color='inherit'>LogIn</Button>) }
                </Box>
                
            </Toolbar>
        </AppBar>
        {renderMenu}
    </>
  )
}

export default Header;