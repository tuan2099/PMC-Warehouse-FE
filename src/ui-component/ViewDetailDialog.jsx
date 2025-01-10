import React from 'react';
import { AppBar, Dialog, DialogContent, IconButton, Toolbar } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ViewDetailDialog = ({ onClose, isOpen, children }) => {
    return (
        <Dialog
            onClose={() => onClose()}
            open={isOpen}
            maxWidth="xl"
            fullWidth
            sx={{
                '& .MuiDialogContent-root': {
                    height: '85%',
                    minHeight: '700px'
                }
            }}
        >
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

ViewDetailDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node
};

ViewDetailDialog.defaultProps = {
    children: null
};

export default ViewDetailDialog;
