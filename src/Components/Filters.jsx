import { Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from "@mui/system";

const Filters = ({ products, filteredProducts, setFilteredProducts, isFilterOpen, setIsFilterOpen }) => {

    const [availableColors, setAvailableColors] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const genders = ['Men', 'Women'];
    const prices = [[0, 250], [251, 400], [450, Number.MAX_SAFE_INTEGER]];
    const [availableTypes, setAvailableTypes] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        setAvailableColors([...new Set(products.map(product => product.color))]);
        setAvailableTypes([...new Set(products.map(product => product.type))]);

    }, [products]);

    const handleCheckboxChange = (setter, value, isPrice = false) => {
        setter(prev =>
            isPrice
                ? prev.some(range => range[0] === value[0] && range[1] === value[1])
                    ? prev.filter(range => range[0] !== value[0] || range[1] !== value[1])
                    : [...prev, value]
                : prev.includes(value)
                    ? prev.filter(item => item !== value)
                    : [...prev, value]
        );
    };

    useEffect(() => {
        // Start with all products
        let filterProducts = products;

        // Filter by selected colors
        if (selectedColors.length > 0) {
            filterProducts = filterProducts.filter(product =>
                selectedColors.includes(product.color)
            );
        }

        // Filter by selected genders
        if (selectedGenders.length > 0) {
            filterProducts = filterProducts.filter(product =>
                selectedGenders.includes(product.gender)
            );
        }

        // Filter by selected price range
        if (selectedPriceRange.length > 0) {
            const minPrice = Math.min(...selectedPriceRange.map(range => range[0]));
            const maxPrice = Math.max(...selectedPriceRange.map(range => range[1]));
            filterProducts = filterProducts.filter(product =>
                product.price >= minPrice && product.price <= maxPrice
            );
        }

        // Filter by selected types
        if (selectedTypes.length > 0) {
            filterProducts = filterProducts.filter(product =>
                selectedTypes.includes(product.type)
            );
        }

        // Update the filtered products
        setFilteredProducts(filterProducts);
    }, [selectedColors, selectedGenders, selectedPriceRange, selectedTypes, products]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                borderRadius: '12px',
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                padding: '4rem',
                margin: '1rem',
                gap: '1rem'
            }}
        >
            {isFilterOpen && <Box> <Button onClick={() => setIsFilterOpen(false)} sx={{ fontSize: '2rem', color: 'blue' }} variant="text">Close X</Button></Box>}
            <Typography variant='h5'>Colour</Typography>

            {availableColors.map((color, idx) => (
                <Box  key={color} sx={{ display: 'flex' }}>

                    <input
                       
                        id="colors"
                        value={selectedColors.includes(color)}
                        onChange={() => handleCheckboxChange(setSelectedColors, color)}
                        type='checkbox'
                    />
                    <label htmlFor='colors'>{color}</label>
                </Box>

            ))}


            <Typography variant='h5'>Gender</Typography>

            {genders.map((gender, idx) => (

                <Box  key={gender} sx={{ display: 'flex' }}>

                    <input
                      
                        id="gender"
                        value={selectedGenders.includes(gender)}
                        onChange={() => handleCheckboxChange(setSelectedGenders, gender)}
                        type='checkbox'
                    />
                    <label htmlFor='gender'>{gender}</label>
                </Box>

            ))}


            <Typography variant='h5'>Price</Typography>

            {prices.map((price, idx) => (
                <Box  key={price[0]} sx={{ display: 'flex' }}>

                    <input
                       
                        id="price"
                        value={selectedPriceRange.some(range => range[0] === price[0] && range[1] === price[1])}
                        onChange={() => handleCheckboxChange(setSelectedPriceRange, price, true)}
                        type='checkbox'
                    />
                    <label htmlFor='price'>{price[1] != Number.MAX_SAFE_INTEGER ? `Rs.${price[0]} - ${price[1]}` : `> Rs.${price[0]}`}</label>
                </Box>

            ))}


            <Typography variant='h5'>Type</Typography>

            {availableTypes.map((ele, idx) => (

                <Box key={ele} sx={{ display: 'flex' }}>

                    <input
                       
                        id="type"
                        value={selectedTypes.includes(ele)}
                        onChange={() => handleCheckboxChange(setSelectedTypes, ele)}
                        type='checkbox'
                    />
                    <label htmlFor='type'>{ele}</label>
                </Box>

            ))}

        </Box>
    );
}

export default Filters;
