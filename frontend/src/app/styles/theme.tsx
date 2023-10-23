"use client"
import { createTheme } from "@mui/material";

const theme= createTheme({
    palette: {
        primary: {
            main: '#149E54',
            contrastText: '#FFF',
            light: 'rgba(20, 158, 84, 0.8)',
        },
        secondary: {
            main: 'rgba(20, 158, 84, 0.04)',
            contrastText: '#000'
        },
        

    }
});

export default theme;