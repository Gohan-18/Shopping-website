import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../feature/Product-slice';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

export default function Product() {

    const state = useSelector((state) => state.products);
    const { singleValue } = state ?? {};

    const params = useParams();
    const { productid } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleProduct({productid}));
    }, [])
    

  return (
    <>
    <Typography>{singleValue.title}</Typography>
    </>
  )
}
