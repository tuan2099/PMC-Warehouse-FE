import React from 'react';
import { AppBar, Dialog, DialogContent, IconButton, Toolbar } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const AddItemDialog = ({ isOpen, onClose, children }) => {
  return (
    <Dialog onClose={() => onClose()} open={isOpen} maxWidth="xl" fullWidth>
      <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="close" onClick={() => onClose()}>
            <CloseIcon color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
