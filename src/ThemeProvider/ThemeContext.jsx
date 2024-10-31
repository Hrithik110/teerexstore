import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useState } from "react";
import {lightTheme, darkTheme} from "./theme";

export const ThemeContext = createContext();

export const ThemeProviderContext = ({children})=>{
    const[darkMode,setDarkMode] = useState(localStorage.getItem('darkMode')==='true'?true:false);

    const toggleTheme = ()=>{
        setDarkMode((prev) => {
            const newValue = !prev;
            localStorage.setItem("darkMode", newValue);
            return newValue;
        });
    }
    const theme = createTheme(darkMode?darkTheme:lightTheme);


    return(
        <ThemeContext.Provider value={{darkMode, toggleTheme, setDarkMode}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}