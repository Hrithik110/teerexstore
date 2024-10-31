import { Box, Stack, Typography,Button } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useTheme } from "@mui/system";


const Card = ({product,cart,setCart}) => {

    const[addedToCart,setAddedToCart] = useState(false);
    const[count,setCount] = useState(1);
    
    const handleAddToCart = ()=>{

        setAddedToCart(true);
    }

    useEffect(()=>{
            const isPresentinCart = cart.find((prod)=>prod.id===product.id);
            setAddedToCart(isPresentinCart);

            if(isPresentinCart){
                const cartProduct = cart.filter((p)=> p.id===product.id);
               
                const quantity = cartProduct[0].quantity;
               
                setCount(quantity);
            }
    },[])

    useEffect(()=>{

        const updatedCart = cart.map((ele) => {
            if (ele.id === product.id) {
                
                return { ...ele, quantity: count };
            }
          
            return ele;
        });

        setCart(updatedCart);
    },[count])
    const handleCountChange = (type)=>{
        if(type=='Increment' && count===product.quantity){
            alert(`Only ${count} items are left`);
            return;
        }
        if(type=='Decrement' && count===1){
            setAddedToCart(false);
            return;
        }
        switch(type){
            case'Increment':
                setCount((prev)=>prev+1);
                break;
            case 'Decrement':
                setCount((prev)=>prev-1);
        }

        
    }


    useEffect(()=>{
        if(addedToCart){
            const cartData = {...product, quantity:1};
            setCart((prev)=>[...prev,cartData])
        }
       else{
        const cartData = cart.filter((ele)=>ele.id!==product.id);

        setCart(cartData);
       }
    },[addedToCart])
    const theme = useTheme();
  return (
    <Stack sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center', padding:'1rem',borderRadius: '12px',
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", height:'20rem', width:'15rem', }}>
      <Box sx={{position:'relative',margin:'0.5rem'}}>
      <Typography sx={{}} variant='h6'>{product.name}</Typography>
        <img style={{width:'100%',height:'100%', objectFit:'contain'}} src={product.imageURL} alt={product.name} />
       
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center',gap:'10px'}}>
        <Typography variant='h6'>Rs. {product.price}</Typography>
        {!addedToCart && <Button onClick={handleAddToCart} sx={{bgcolor:theme.palette.button.main, color:theme.palette.text.secondary}} variant="contained">Add to Cart</Button>}
        {addedToCart && <Box sx={{bgcolor:theme.palette.button.main, color:theme.palette.text.secondary, display:'flex', alignItems:'center'}} variant="contained"><Button sx={{color:theme.palette.text.secondary}} onClick={()=>handleCountChange('Decrement')} variant='text'>-</Button>{count}<Button  onClick={()=>handleCountChange('Increment')} sx={{color:theme.palette.text.secondary}} variant='text'>+</Button></Box>}

      </Box>
    </Stack>
  )
}


export default Card
