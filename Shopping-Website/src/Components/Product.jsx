import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../feature/Product-slice';
import { useSelector } from 'react-redux';
import { Typography, Container, Grid, ImageList, ImageListItem, CardMedia, Card, useTheme, Paper, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

export default function Product() {

  const state = useSelector((state) => state.products);
  const { singleValue } = state ?? {};
  let {images} = singleValue;
  let imageList = [];
  const [currentIndex, setcurrentIndex] = useState(0);

  for(let i = 0; i < images?.length; i++){
    imageList.push(images[i]);
  }
  const theme = useTheme();

  // let images = [];
  // images = [singleValue.images];
  // console.log(singleValue.images);
  // console.log(images);

  const params = useParams();
  const { productid } = params;
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchSingleProduct({productid}));
  }, [])
    
  return (
    <>
    <Container maxWidth='lg' sx={{mt:theme.spacing(9)}}>
      <Grid container item spacing={2} xs={12} sm={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {/* <Grid item container xs={6} spacing={2}> */}
          <Box sx={{ position: 'relative'}}>
            <Paper elevation={0}  >
                <IconButton sx={{position: 'absolute', top: '50%', left: '20px'}}>
                  <NavigateBeforeRoundedIcon sx={{fill: '#fff'}}/>
                </IconButton>
                <IconButton sx={{position: 'absolute', top: '50%', right: '20px'}}>
                  <NavigateNextRoundedIcon sx={{fill: '#fff'}} />
                </IconButton>
                <CardMedia
                  component='img'
                  image={imageList[0]}
                  alt={singleValue.title}
                  sx={{
                    alignSelf:'center', 
                    width:theme.spacing(40), 
                    height:theme.spacing(40), 
                    objectFit:'contain', 
                    pt: theme.spacing(3),
                    // cursor: 'pointer'
                  }}
                />
              </Paper>
            {/* <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, overflowX: 'auto', width: '200px'}}>
              {images?.map((item, i) => (
                <Paper key={i} elevation={0} >
                  <CardMedia
                    elevattion={0}
                    component='img' 
                    image={item}
                    alt={singleValue.title}
                    sx={{
                      alignSelf:'center', 
                      width:theme.spacing(30), 
                      height:theme.spacing(30), 
                      objectFit:'contain', 
                      pt: theme.spacing(3),
                      cursor: 'pointer',
                    }}
                  />
                </Paper>
                ))}
            </Box> */}
          </Box>
        {/* </Grid> */}
        <Grid item xs={12} sm={6}>



        </Grid>

      </Grid>
    </Container>
    </>
  )
}
