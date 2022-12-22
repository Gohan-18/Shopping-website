import { AppBar, Badge, Button, IconButton, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getItemCount } from '../utils';
import { styled, alpha } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fetchAllCategories } from '../feature/Category-slice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.value);
    const count = getItemCount(cartItems);

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

    const SearchBar = () => {
        const [selectedCategory, setSelectedCategory] = useState('all');
        const navigate = useNavigate();
        const categoriesItems = useSelector((state) => state.categories?.value);
        const products = useSelector((state) => state.products?.value);

        const [searchParams ] = useSearchParams();
        const category = searchParams.get('category');

        useEffect (() => {
            setSelectedCategory(category ? category : 'all');
        }, [category]);
        

        if(!categoriesItems.length) {
            dispatch(fetchAllCategories());
        }

        const handleCategoryChange = (e) => {
            const { value } = e.target;
            navigate(value === 'all' ? '/' : `/?category=${value}`);
        }

        return (
        <Search>
            <Select
            value={selectedCategory}
            size='small'
            sx={{
                textTransform:'capitalize',
                m:'1',
                '&':{},
                padding:'5px 20px',
                margin:'0 10px'
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
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Array.from(products, (prod) => ({id: prod.id, label: prod.title}))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label='Product List' />}
            />
        </Search>)
    }

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
            <SearchBar/>
            <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
                <IconButton 
                size='large' 
                aria-label='shows cart item count' 
                color='inherit'
                sx={{
                    margin:'10px',
                    padding:'10px'
                }}>
                    <Badge badgeContent={count} color="error">
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