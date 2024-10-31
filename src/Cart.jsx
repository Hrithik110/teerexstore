// src/Cart.js
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useCart } from './CartContext';
import Header from './Components/Header';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Cart = () => {
  const { cart, setCart } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const quantities = cart.reduce((acc, curr) => curr.quantity + acc, 0);

    setCartCount(quantities);

    const amount = cart.reduce((acc, curr) => (curr.quantity * curr.price) + acc, 0)

    setTotalAmount(amount);
  }, [cart])

  const handleOnClick = (product) => {
    const updatedCart = cart.filter((ele) => ele.id !== product.id);

    setCart(updatedCart);
  }
  return (
    <Box>
      <Header cartCount={cartCount} isCart={true} />
      <Box sx={{ display: 'flex', flexDirection: 'column', margin: '2rem' }}>
        <Typography variant="h4">Shopping Cart</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
          {cart.length !== 0 && cart.map((product) => (<Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: '7rem', alignItems: 'center', margin: '2rem' }}>
            <img style={{ width: '5rem', height: '5rem' }} src={product.imageURL} alt={product.name} />
            <Box>
              <Typography variant='body2'>{product.name}</Typography>
              <Typography variant='body2'>Rs. {product.price}</Typography>
            </Box>

            <button disabled style={{ backgroundColor: 'lightGrey', display: 'flex', alignItems: 'center' }}>Quantity {product.quantity} <ArrowDropDownIcon /></button>

            <button onClick={() => handleOnClick(product)} style={{ backgroundColor: 'white', border: '1px solid green', borderRadius: '5px', cursor: 'pointer', padding: '0.5rem' }}>Delete</button>


          </Box>



          ))}

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width:'100%' }}>

            <hr style={{ border: '2px solid black', width: '100%' }} />

            <Typography variant="body2">Total Amount: {totalAmount}</Typography>
          </Box>

        </Box>
      </Box>

    </Box>
  );
}

export default Cart;
