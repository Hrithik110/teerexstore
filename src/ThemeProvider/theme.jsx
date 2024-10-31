import React from "react";

import { createTheme } from "@mui/material";
import { grey, white,black } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette:{
        primary:{
            main: grey[500],
        },
        secondary:{
            main:"#ffff",
        },
        button:{
            main:'#000',
        },
        background:{
            main:grey[500],
        },
        text:{
            main:"#0000",
            secondary:'#fff'
        }
    },
        typography: {
            fontFamily: 'Ubuntu, Open Sans, sans-serif',
            h1: { fontSize: '2rem', fontWeight: 700, color:'#9785BA' },
            h2: { fontSize: '1.75rem', fontWeight: 400 },
            h3:{fontSize: '1.5rem', fontWeight: 400},
            h4:{fontSize: '1.25rem', fontWeight: 400, color:'#000'},
    
            body1: { fontSize: '1rem', fontWeight: 700,color:'#D3D3D3' },
            body2:{fontSize: '1rem', fontWeight: 700,color:'#000'},
            p:{color:'#0000009E', fontFamily:'Open Sans', fontWeight:400,fontSize:'0.75rem'}
        },
    
})

export const darkTheme = createTheme({
    palette:{
        primary:{
            main: grey[500],
        },
        secondary:{
            main:"#0000",
        }, 
        button:{
            main:'#ffff',
        },
        background:{
            main:"#0000",
        },
        text:{
            main:"#ffff",
            secondary:'#000'
        }
    },
        typography: {
            fontFamily: 'Ubuntu, Open Sans, sans-serif',
            h1: { fontSize: '2rem', fontWeight: 700, color:'#9785BA' },
            h2: { fontSize: '1.75rem', fontWeight: 500 },
            h3:{fontSize: '1.5rem', fontWeight: 400},
            h4:{fontSize: '1.25rem', fontWeight: 700, color:'#000'},
    
            body1: { fontSize: '1rem', fontWeight: 700,color:'#000' },
            body2:{fontSize: '1rem', fontWeight: 400,color:'#000'},
            p:{color:'#0000009E', fontFamily:'Open Sans', fontWeight:400,fontSize:'0.75rem'}
        },
    
})