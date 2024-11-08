/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, IconButton, Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Add as AddIcon, Search as SearchIcon, ModeEdit as ModeEditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/DataTable';
import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';
import orderApi from 'api/order.api';
import productsApi from '../../api/product.api';
import userApi from 'api/auth.api';
import OrderDetail from './components/OrderDetail';
import OrderForm from './components/OrderForm';
import suppliersApi from 'api/suppliers.api';

function Order() {
  const [openDialog, setOpenDialog] = useState();
  const [viewItem, setViewItem] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page');
  const userDataLogin = JSON.parse(localStorage.getItem('auth_user'));

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'orderCode', headerName: 'Mã nhập kho', width: 150 },
    { field: 'purchaseDate', headerName: 'Ngày nhập', width: 250 },
    { field: 'purchaseType', headerName: 'Phân loại', width: 150 },
    { field: 'purchaseQuantity', headerName: 'Tổng số lượng', width: 200 },
    { field: 'purchaseTotalAmount', headerName: 'Tổng số tiền', width: 200 },
    { field: 'purchaseVATAmount', headerName: 'VAT', with: 100 },
    { field: 'purchaseTotalAmountAfterVAT	', headerName: 'Tổng tiền sau VAT', with: 250 },
    { field: 'note', headerName: 'Ghi chú', with: 200, valueGetter: (params) => params.name },
    { field: 'paymentStatus', headerName: 'Trạng thái', with: 200, valueGetter: (params) => params.name },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton
            aria-label="delete"
            variant="contained"
            color="secondary"
            onClick={() => {
              window.confirm('Are you sure you want to delete');
              deleteOrderMutation.mutate(id);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog1');
              navigate(`?mode=update&id=${id}`, { replace: true });
            }}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog2');
              const chooseItem = OrderData?.data?.data.find((item) => item.id === id);
              setViewItem(chooseItem);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const { data: OrderData, refetch } = useQuery({
    queryKey: ['order', page],
    queryFn: () => orderApi.getAllOrders(page),
    keepPreviousData: true
  });

  const createOrderMutation = useMutation({
    mutationFn: (body) => orderApi.createOrder(body)
  });

  const updateOrderMutation = useMutation({
    mutationFn: (data) => {
      return orderApi.updateOrder(data.id, data.body);
    },
    onSuccess: () => {
      handleCloseDialog();
      toast.success('Cập nhập phiếu nhập kho thành công', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      refetch();
    },
    onError: (error) => {
      toast.error(`Cập nhập phiếu xuất kho thất bại: ${error.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (id) => orderApi.deleteOrder(id),
    onSuccess: () => {
      refetch();
    }
  });

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = () => {
    navigate('', { replace: true });
    setOpenDialog(null);
  };

  const { data: userDetail } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return userApi.getUserById(userDataLogin.id);
    }
  });
  const { data: suppliersData } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => suppliersApi.getAllSuplliers(),
    keepPreviousData: true
  });

  const { data: ProductsData } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => await productsApi.getAllProducts(page),
    onSuccess: (data) => {
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: data.data.meta.totalPages.toString() });
      }
    },
    keepPreviousData: true
  });

  const userLogin = userDetail?.data?.data;
  return (
    <MainCard title="Thông tin nhập kho">
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        onClick={() => {
          navigate(`?mode=add`, { replace: true });
          handleOpenDialog('dialog1');
        }}
        startIcon={<AddIcon />}
      >
        Tạo Đơn nhập
      </Button>

      <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
        <OrderForm
          createOrderMutation={createOrderMutation}
          updateOrderMutation={updateOrderMutation}
          userLogin={userLogin}
          handleCloseDialog={handleCloseDialog}
          suppliersData={suppliersData}
          ProductsData={ProductsData}
          refetch={refetch}
        />
      </AddItemDialog>

      <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
        <OrderDetail data={viewItem} />
      </ViewDetailDialog>

      <Box sx={{ height: '100%', width: '100%' }}>
        <DataTable columns={columns} data={OrderData} />
      </Box>
    </MainCard>
  );
}

export default Order;
