import React, { useEffect, useState } from 'react'
import { Stack, Box, TextField, Button } from '@mui/material'
import Card from './Card';
import SearchIcon from '@mui/icons-material/Search';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTheme } from "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';


const ProductsSearch = ({products, cart, setCart,filteredProducts,setFilteredProducts, setIsFilterOpen}) => {

    const[searchInput, setSearchInput] = useState("");
    
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const onChange=(e)=>{
        setSearchInput(e.target.value);
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        if(searchInput===""){
            alert(`You are missing search text`);
            return;
        }

        const filter = products.filter((product)=>{
            return product.name.toLowerCase().includes(searchInput.toLowerCase());
        });
        setFilteredProducts(filter);
    }

    useEffect(()=>{
        setFilteredProducts(products)
        
    },[products])
   
  return (
    <Stack 
    sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center', gap:'2rem'
    }}
    >
      <Box component="form" 
      onSubmit={handleOnSubmit}
      sx={{ display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'10px', alignItems:'center', '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      >
        
        <TextField sx={{width:!isMediumScreen?'3rem':'auto'}} onChange={onChange} value={searchInput} id="standard-basic" label="Search for products.." variant="standard" required/>

        <Button className='search-button-container' sx={{ width: !isMediumScreen ? '25px' : 'auto', minWidth:!isMediumScreen?'0!important':'64px' ,height:!isMediumScreen ? '35px' : 'auto',bgcolor:!isMediumScreen?theme.palette.button.main:'auto' }}  type='submit' variant="contained"><SearchIcon sx={{color:'white', width: !isMediumScreen ? '1rem' : 'auto', height:!isMediumScreen ? '1rem' : 'auto' }}/></Button>
        {!isMediumScreen &&  <Button sx={{ width: !isMediumScreen ? '25px' : 'auto', minWidth:'0!important' ,height:!isMediumScreen ? '35px' : 'auto', bgcolor:!isMediumScreen?theme.palette.button.main:'auto' }} onClick={()=>setIsFilterOpen((prev)=>!prev)} variant="contained"><FilterAltIcon sx={{color:'white'}}/></Button>}
      </Box>
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', gap:'2rem'}}>
        {filteredProducts.length!==0 && filteredProducts.map((product)=>(
            <Card key={product.id} product={product} cart={cart} setCart={setCart}/>
        ))}

        {
            filteredProducts && filteredProducts.length === 0 && <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', gap:'2rem'}}><SentimentSatisfiedIcon/> There is no product matching your search. Please search something else.</Box>
        }
    </Box>

    </Stack>
  )
}

export default ProductsSearch
