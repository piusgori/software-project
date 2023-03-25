import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Spinner = () => {
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
    </Box>
  )
}

export default Spinner