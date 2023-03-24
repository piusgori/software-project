import { createTheme } from '@mui/material';

const font = "'Poppins', sans-serif";

export const theme = createTheme({
    typography: { fontFamily: font },
    palette: {
        primary: { main: '#9b45b2' },
        secondary: { main: '#af6ac1' }
    }
})