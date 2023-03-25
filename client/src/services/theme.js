import { createTheme } from '@mui/material';

const font = "'Poppins', sans-serif";

export const theme = createTheme({
    typography: { fontFamily: font },
    palette: {
        primary: { main: '#4B0F70' },
        secondary: { main: '#af6ac1' }
    }
})