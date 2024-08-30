/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// MUI components
import MainCard from 'ui-component/cards/MainCard';
import { Button, Dialog, DialogContent, Toolbar, AppBar, IconButton, Box } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

// third party
import { useMutation, useQuery } from '@tanstack/react-query';

// Api
import productsApi from '../../api/product.api';
import ProductForm from './components/ProductForm';

function Products() {
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState({
    name: '',
    size: '',
    salePrice: '',
    purchasePrice: '',
    quantityIn: '',
    quantityOut: '',
    image: '',
    status: '',
    minimumQuantity: '',
    maximumQuantity: '',
    note: ''
  });
  // cài đặt column cho data-grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên Biển bảng', width: 350 },
    { field: 'size', headerName: 'Kích thước', width: 250 },
    { field: 'salePrice', headerName: 'Giá bán', width: 250 },
    { field: 'purchasePrice', headerName: 'Giá nhập', width: 250 },
    { field: 'quantityIn', headerName: 'Số lượng tối thiểu', width: 250 },
    { field: 'quantityOut', headerName: 'Số lượng tối đa', width: 250 },
    { field: 'note', headerName: 'Ghi chú', width: 250 }
  ];

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

  const { data: ProductsData, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsApi.getAllProducts()
  });

  return (
    <>
      <MainCard title="Quản lý biển bảng">
        <Button
          sx={{ mb: 2 }}
          variant="outlined"
          onClick={() => {
            handleOpenDialog('dialog1');
          }}
          startIcon={<AddIcon />}
        >
          Tạo Sản Phẩm
        </Button>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid rows={ProductsData?.data} columns={columns} pageSize={5} checkboxSelection />
        </Box>

        <Dialog onClose={() => handleCloseDialog('dialog1')} open={openDialog === 'dialog1'} maxWidth="xl" fullWidth>
          <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="close" onClick={handleCloseDialog}>
                <CloseIcon color="primary" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <ProductForm formState={formState} />
          </DialogContent>
        </Dialog>
      </MainCard>
    </>
  );
}

export default Products;
