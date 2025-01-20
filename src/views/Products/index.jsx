import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { Button, IconButton, Box } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ModeEdit as ModeEditIcon, Search as SearchIcon } from '@mui/icons-material';
import { useMutation, useQuery } from '@tanstack/react-query';
import productsApi from '../../api/product.api';
import ProductForm from './components/ProductForm';
import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';
import DataTable from 'ui-component/DataTable';
import InfoProduct from './components/infoProduct';
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên Biển bảng', width: 350 },
    { field: 'size', headerName: 'Kích thước', width: 250 },
    { field: 'quantityIn', headerName: 'Số lượng tối thiểu', width: 250 },
    { field: 'quantityOut', headerName: 'Số lượng tối đa', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteProduct(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateProduct(id)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog2');
              handleGetProduct(id);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const { data: ProductsData, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsApi.getAllProducts(),
    onSuccess: (data) => {
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: data.data.meta.totalPages.toString() });
      }
    },
    keepPreviousData: true
  });

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = () => {
    setIsEdit(false);
    setOpenDialog(null);
    resetFormState();
  };

  const resetFormState = () => {
    setFormState(INITIAL_STATE);
  };

  const createProductMutation = useMutation({
    mutationFn: (body) => productsApi.createProduct(body),
    onSuccess: () => {
      alert('Thêm sản phẩm thành công!');
      refetch();
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      alert('Xoá sản phẩm thành công!');
      refetch();
    },
    onError: () => {
      alert('Xoá sản phẩm thất bại!');
      refetch();
    }
  });

  const handleDeleteProduct = (rowId) => {
    if (window.confirm('Are you sure you want to delete')) {
      deleteProductMutation.mutate(rowId);
    }
  };

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

  const getProductMutation = useMutation({
    mutationFn: (body) => productsApi.getProduct(body),
    onSuccess: (product) => {
      const productDetailsData = product?.data;
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
  };

  const handleUpdateProduct = (rowId) => {
    getProductMutation.mutate(rowId);
    handleOpenDialog('dialog1');
  };

  return (
    <>
      <MainCard title="Quản lý biển bảng">
        <Button sx={{ mb: 2 }} variant="outlined" onClick={() => handleOpenDialog('dialog1')} startIcon={<AddIcon />}>
          Tạo Sản Phẩm
        </Button>

        <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
          <ProductForm
            updateProductMutation={updateProductMutation}
            isEdit={isEdit}
            createProductMutation={createProductMutation}
            formState={formState}
            productID={productID}
            handleCloseDialog={handleCloseDialog}
          />
        </AddItemDialog>

        <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
          <InfoProduct productID={productID} />
        </ViewDetailDialog>

        <Box sx={{ height: '100%', width: '100%' }}>
          <DataTable rows={ProductsData?.data} columns={columns} />
        </Box>
      </MainCard>
    </>
  );
}

export default Products;
