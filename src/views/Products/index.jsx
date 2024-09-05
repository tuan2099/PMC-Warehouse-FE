/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// Các thành phần của MUI
import MainCard from 'ui-component/cards/MainCard';
import { Button, Dialog, DialogContent, Toolbar, AppBar, IconButton, Box } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

// Thư viện bên thứ ba
import { useMutation, useQuery } from '@tanstack/react-query';

// API
import productsApi from '../../api/product.api';

// Thành phần form sản phẩm tùy chỉnh
import ProductForm from './components/ProductForm';

function Products() {
  // Quản lý trạng thái mở/đóng của dialog và trạng thái của form
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState(initialFormState()); // Khởi tạo trạng thái của form

  // Cấu hình các cột cho bảng dữ liệu sản phẩm
  const columns = getColumns();

  // Lấy tất cả sản phẩm từ API thông qua `useQuery`
  const { data: ProductsData, refetch } = useQuery({
    queryKey: ['products'], // Khóa truy vấn
    queryFn: async () => await productsApi.getAllProducts() // Hàm gọi API lấy tất cả sản phẩm
  });

  // Hàm mở dialog để tạo mới sản phẩm
  const handleOpenDialog = () => {
    setOpenDialog(true); // Mở dialog
  };

  // Hàm đóng dialog và reset form về trạng thái ban đầu
  const handleCloseDialog = () => {
    setOpenDialog(false); // Đóng dialog
    resetFormState(); // Đặt lại trạng thái form
  };

  // Hàm reset trạng thái form
  const resetFormState = () => {
    setFormState(initialFormState()); // Đặt lại trạng thái form về giá trị mặc định
  };

  // Hàm thêm mới sản phẩm
  const createProductMutation = useMutation({
    mutationFn: (body) => productsApi.createProduct(body),
    onSuccess: (product) => {
      console.log(product); // In ra thông tin sản phẩm mới
      alert('Thêm sản phẩm thành công!');
      refetch(); // Làm mới dữ liệu bảng dữ liệu
    }
  });

  return (
    <>
      <MainCard title="Quản lý biển bảng">
        {/* Nút mở form để tạo sản phẩm mới */}
        <Button sx={{ mb: 2 }} variant="outlined" onClick={handleOpenDialog} startIcon={<AddIcon />}>
          Tạo Sản Phẩm
        </Button>

        {/* Bảng hiển thị danh sách sản phẩm */}
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid rows={ProductsData?.data || []} columns={columns} pageSize={5} checkboxSelection />
        </Box>

        {/* Dialog chứa form tạo sản phẩm mới */}
        <Dialog onClose={handleCloseDialog} open={openDialog} maxWidth="xl" fullWidth>
          <AppBar sx={{ position: 'relative', backgroundColor: '#fff', boxShadow: 'none' }}>
            <Toolbar>
              {/* Nút đóng dialog */}
              <IconButton edge="start" color="inherit" aria-label="close" onClick={handleCloseDialog}>
                <CloseIcon color="primary" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            {/* Form tạo sản phẩm */}
            <ProductForm createProductMutation={createProductMutation} formState={formState} />
          </DialogContent>
        </Dialog>
      </MainCard>
    </>
  );
}

// Hàm khởi tạo trạng thái mặc định cho form
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

// Cấu hình cột cho bảng dữ liệu sản phẩm
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
