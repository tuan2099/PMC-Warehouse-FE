/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// MUI components
import MainCard from 'ui-component/cards/MainCard';
import { Button, Dialog, DialogContent, Toolbar, AppBar, IconButton, Box } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

// third party
import { useQuery } from '@tanstack/react-query';

// Api
import productsApi from '../../api/product.api';
import ProductForm from './components/ProductForm';

function Products() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState(initialFormState());

  const columns = getColumns();

  const { data: ProductsData, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsApi.getAllProducts()
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetFormState();
  };

  const resetFormState = () => {
    setFormState(initialFormState());
  };

  return (
    <>
      <MainCard title="Quản lý biển bảng">
        <Button sx={{ mb: 2 }} variant="outlined" onClick={handleOpenDialog} startIcon={<AddIcon />}>
          Tạo Sản Phẩm
        </Button>

        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid rows={ProductsData?.data || []} columns={columns} pageSize={5} checkboxSelection />
        </Box>

        <Dialog onClose={handleCloseDialog} open={openDialog} maxWidth="xl" fullWidth>
          <AppBar sx={{ position: 'relative', backgroundColor: '#fff', boxShadow: 'none' }}>
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

const initialFormState = () => ({
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

const getColumns = () => [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Tên Biển bảng', width: 350 },
  { field: 'size', headerName: 'Kích thước', width: 250 },
  { field: 'salePrice', headerName: 'Giá bán', width: 250 },
  { field: 'purchasePrice', headerName: 'Giá nhập', width: 250 },
  { field: 'quantityIn', headerName: 'Số lượng tối thiểu', width: 250 },
  { field: 'quantityOut', headerName: 'Số lượng tối đa', width: 250 },
  { field: 'note', headerName: 'Ghi chú', width: 250 }
];

export default Products;
