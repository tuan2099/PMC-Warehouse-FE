/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, Toolbar, AppBar, IconButton } from '@mui/material';

import { useMutation } from '@tanstack/react-query';
import warehouseDispatchApi from '../../api/warehouseDispatch';
import MainCard from 'ui-component/cards/MainCard';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import WarehouseDispatchForm from './components/WarehouseDispatchForm';
function WarehouseDispatch() {
  const userDataLogin = JSON.parse(localStorage.getItem('auth_user'));

  const [isEdit, setIsEdit] = useState();
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState({
    exportCode: '',
    exportDate: '',
    exportType: '',
    totalProductQuantity: '',
    totalAmount: '',
    exportDescription: '',
    recipient: '',
    userID: '',
    warehouseID: '',
    dispatches: [
      {
        quantity: '',
        product: ''
      }
    ]
  });
  const createWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseDispatchApi.createWarehouseDispatch(body)
  });
  // Open & close ---> Dialog
  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
    // console.log(dialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      // setFormState({
      //   name: '',
      //   email: '',
      //   password: '',
      //   role: ''
      // });
      // setIsEdit(false);
    } else if (dialogId === 'dialog2') {
      // Reset state cho dialog2 nếu cần
    }
  };
  return (
    <>
      <MainCard title="Thông tin xuất kho">
        <Button
          sx={{ mb: 2 }}
          variant="outlined"
          onClick={() => {
            handleOpenDialog('dialog1');
          }}
          startIcon={<AddIcon />}
        >
          Tạo Đơn xuất
        </Button>

        <Dialog onClose={() => handleCloseDialog('dialog1')} open={openDialog === 'dialog1'} maxWidth="xl" fullWidth>
          <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="close" onClick={handleCloseDialog}>
                <CloseIcon color="primary" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <WarehouseDispatchForm formState={formState} createWarehouseMutation={createWarehouseMutation} userDataLogin={userDataLogin} />
          </DialogContent>
        </Dialog>
      </MainCard>
    </>
  );
}

export default WarehouseDispatch;
