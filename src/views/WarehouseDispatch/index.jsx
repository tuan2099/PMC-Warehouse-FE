/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { Button, Dialog, DialogContent, Toolbar, AppBar, IconButton } from '@mui/material';

import { useMutation, useQuery } from '@tanstack/react-query';
import warehouseDispatchApi from '../../api/warehouseDispatch';
import MainCard from 'ui-component/cards/MainCard';
import userApi from 'api/auth.api';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import WarehouseDispatchForm from './components/WarehouseDispatchForm';
function WarehouseDispatch() {
  const userDataLogin = JSON.parse(localStorage.getItem('auth_user'));
  // const [isEdit, setIsEdit] = useState();
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
    customerID: '',
    dispatches: [
      {
        quantity: '',
        productName: '',
        price: '',
        totalPriceProduct: ''
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

  const { data: userDetail } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return userApi.getUserById(userDataLogin.id);
    }
  });

  const userLogin = userDetail?.data?.data;
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
            <WarehouseDispatchForm formState={formState} createWarehouseMutation={createWarehouseMutation} userLogin={userLogin} />
          </DialogContent>
        </Dialog>
      </MainCard>
    </>
  );
}

export default WarehouseDispatch;
