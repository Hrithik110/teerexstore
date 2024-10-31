import React from 'react'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {Box, Typography, Badge} from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from "../ThemeProvider/ThemeContext";
import { useTheme } from "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

const Header = ({cartCount, isCart=false}) => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box  sx={{display:'flex',justifyContent:'space-between', alignItems:'center', padding:'1rem', bgcolor:theme.palette.background.main}}>
     <Link style={{textDecoration: 'none',}} to='/'> <Typography variant='h4'>TeeRex Store</Typography></Link>
      <Box  sx={{display:'flex',justifyContent:'space-around'}}>
      {isMediumScreen &&<Link style={{textDecoration: 'none'}} to='/'> <Typography sx={{ borderBottom:'1px solid black', marginRight:'2rem'}} variant='h4'>Products</Typography></Link> }
      <Badge badgeContent={cartCount} color="primary">
    <Link style={{textDecoration: 'none'}} to={isCart?'':'Cart'}><ShoppingCartCheckoutIcon /></Link>  
    </Badge>
      </Box>
      
    </Box>
  )
}

export default Header
