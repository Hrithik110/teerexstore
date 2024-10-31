// Home.js
import { Box } from '@mui/material';
import React, {createContext, useContext, useEffect, useState } from 'react';
import Header from './Components/Header';
import axios from 'axios';
import ProductsSearch from './Components/ProductsSearch';
import Filters from './Components/Filters';
import { useTheme } from "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';

import { useCart } from './CartContext'; 


const Home = () => {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`);
        setProducts(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Box>
      <Header cartCount={cartCount} />
      {isMediumScreen && (
        <Box sx={{ display: 'flex' }}>
          <Filters filteredProducts={filteredProducts} products={products} setFilteredProducts={setFilteredProducts} />
          <ProductsSearch cart={cart} setCart={setCart} products={products} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />
        </Box>
      )}

      {!isMediumScreen && !isFilterOpen && (
        <Box sx={{ display: 'flex' }}>
          <ProductsSearch cart={cart} setCart={setCart} products={products} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} setIsFilterOpen={setIsFilterOpen} />
        </Box>
      )}
      {isFilterOpen && (
        <Box>
          <Filters filteredProducts={filteredProducts} products={products} setFilteredProducts={setFilteredProducts} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
        </Box>
      )}
    </Box>
  );
}

export default Home;
