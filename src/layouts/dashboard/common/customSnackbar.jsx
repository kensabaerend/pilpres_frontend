/* eslint-disable react/prop-types */
// CustomSnackbar.js
import React from 'react';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const CustomSnackbar = ({ open, message, severity, handleClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'bottom' }}
  >
    <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
      {message}
    </MuiAlert>
  </Snackbar>
);

export default CustomSnackbar;
