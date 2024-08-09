/* eslint-disable prettier/prettier */
import React from 'react';
import { Dialog, DialogContent, Toolbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
// eslint-disable-next-line react/prop-types
function Formsetting({ open, onClose, UserForm }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon color="primary" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>{UserForm}</DialogContent>
      </Dialog>
    </div>
  );
}

export default Formsetting;
