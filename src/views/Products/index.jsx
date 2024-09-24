import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Các thành phần của MUI
import MainCard from 'ui-component/cards/MainCard';
import { Button, Dialog, DialogContent, Toolbar, AppBar, IconButton, Box } from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  ModeEdit as ModeEditIcon,
  Close as CloseIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@tanstack/react-query';

import productsApi from '../../api/product.api';
import ProductForm from './components/ProductForm';
import DataTable from 'ui-component/DataTable';

const INITIAL_STATE = {
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
};

function Products() {
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isEdit, setIsEdit] = useState(false);
  const [productID, setProductID] = useState([]);


  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  
  // Cấu hình các cột cho bảng dữ liệu sản phẩm
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên Biển bảng', width: 350 },
    { field: 'size', headerName: 'Kích thước', width: 250 },
    { field: 'salePrice', headerName: 'Giá bán', width: 250 },
    { field: 'purchasePrice', headerName: 'Giá nhập', width: 250 },
    { field: 'quantityIn', headerName: 'Số lượng tối thiểu', width: 250 },
    { field: 'quantityOut', headerName: 'Số lượng tối đa', width: 250 },
    { field: 'note', headerName: 'Ghi chú', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          {/* Nút xóa kho hàng */}
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteProduct(id)}>
            <DeleteIcon />
          </IconButton>
          {/* Nút chỉnh sửa kho hàng */}
          <IconButton onClick={() => handleGetProduct(id)}>
            <ModeEditIcon />
          </IconButton>
          {/* Nút xem thông tin chi tiết kho hàng */}
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog2');
              handleGetWarehouse(id);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  // Lấy tất cả sản phẩm từ API thông qua `useQuery`
  const { data: ProductsData, refetch } = useQuery({
    queryKey: ['products', page], // Khóa truy vấn
    queryFn: async () => await productsApi.getAllProducts(page), // Hàm gọi API lấy tất cả sản phẩm
    onSuccess: (data) => {
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: data.data.meta.totalPages.toString() });
      }
    },
    keepPreviousData: true
  });

  // Hàm mở dialog để tạo mới sản phẩm
  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId); // Mở dialog
  };

  // Hàm đóng dialog và reset form về trạng thái ban đầu
  const handleCloseDialog = () => {
    setIsEdit(false);
    setOpenDialog(null); // Đóng dialog
    resetFormState(); // Đặt lại trạng thái form
  };

  // Hàm reset trạng thái form
  const resetFormState = () => {
    setFormState(initialFormState()); // Đặt lại trạng thái form về giá trị mặc định
  };

  // Hàm thêm mới sản phẩm
  const createProductMutation = useMutation({
    mutationFn: (body) => productsApi.createProduct(body),
    onSuccess: () => {
      alert('Thêm sản phẩm thành công!');
      refetch(); // Làm mới dữ liệu bảng dữ liệu
    }
  });

  // Hàm xoá sản phẩm
  const deleteProductMutation = useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      alert('Xoá sản phẩm thành công!');
      refetch(); // Làm mới dữ liệu bảng dữ liệu
    },
    onError: () => {
      alert('Xoá sản phẩm thất bại!');
      refetch(); // Làm mới dữ liệu bảng dữ liệu
    }
  });

  const handleDeleteProduct = (rowId) => {
    if (window.confirm('Are you sure you want to delete')) {
      deleteProductMutation.mutate(rowId); // Gọi hàm xóa kho hàng
    }
  };

  // Hàm cập nhật sản phẩm
  const updateProductMutation = useMutation({
    mutationFn: ({ productId, values }) => {
      if (!productId) {
        throw new Error('Làm đếch gì có ID');
      }
      return productsApi.updateProduct(productId, values);
    },
    onSuccess: () => {
      alert('Cập nhật sản phẩm thành công');
      refetch();
    }
  });

  // Hàm láy thông tin product
  const getProductMutation = useMutation({
    mutationFn: (body) => productsApi.getProduct(body),
    onSuccess: (product) => {
      const productDetailsData = product.data.data;
      setIsEdit(true);
      setProductID(productDetailsData);
      setFormState({
        name: productDetailsData.name,
        size: productDetailsData.size,
        salePrice: productDetailsData.salePrice,
        purchasePrice: productDetailsData.purchasePrice,
        quantityIn: productDetailsData.quantityIn,
        quantityOut: productDetailsData.quantityOut,
        image: productDetailsData.image,
        status: productDetailsData.status,
        minimumQuantity: productDetailsData.minimumQuantity,
        maximumQuantity: productDetailsData.maximumQuantity,
        note: productDetailsData.note
      });
    }
  });

  const handleGetProduct = (rowId) => {
    getProductMutation.mutate(rowId);
    handleOpenDialog('dialog1'); // Mở dialog cập nhật
  };

  return (
    <>
      <MainCard title="Quản lý biển bảng">
        {/* Nút mở form để tạo sản phẩm mới */}
        <Button sx={{ mb: 2 }} variant="outlined" onClick={() => handleOpenDialog('dialog1')} startIcon={<AddIcon />}>
          Tạo Sản Phẩm
        </Button>

        {/* Bảng hiển thị danh sách sản phẩm */}
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataTable rows={ProductsData} columns={columns} />
        </Box>

        {/* Dialog chứa form tạo sản phẩm mới */}
        <Dialog onClose={() => handleCloseDialog('dialog1')} open={openDialog === 'dialog1'} maxWidth="xl" fullWidth>
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
            <ProductForm
              updateProductMutation={updateProductMutation}
              isEdit={isEdit}
              createProductMutation={createProductMutation}
              formState={formState}
              productID={productID}
            />
          </DialogContent>
        </Dialog>
      </MainCard>
    </>
  );
}

export default Products;
