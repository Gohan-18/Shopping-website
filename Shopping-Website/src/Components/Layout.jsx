import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from './Footer';

const theme = createTheme({
    palette: {
        mode: 'light',
    }
})

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <main>
            <CssBaseline/>
            <Outlet/>
        </main>
        <Footer/>
    </ThemeProvider>
  )
}

export default Layout