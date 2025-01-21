import React, { useState } from 'react';
import { Button, IconButton, Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Add as AddIcon, Search as SearchIcon, ModeEdit as ModeEditIcon, Delete as DeleteIcon } from '@mui/icons-material';
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
import warehouseApi from 'api/warehouse.api';
function Order() {
  const [openDialog, setOpenDialog] = useState();
  const [viewItem, setViewItem] = useState();
  const navigate = useNavigate();
  const userDataLogin = JSON.parse(localStorage.getItem('auth_user'));
  const userID = JSON.parse(localStorage.getItem('auth_user'));

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
    queryKey: ['order'],
    queryFn: () => orderApi.getAllOrders(),
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
      toast.success('Cập nhập phiếu thành công');
      refetch();
    },
    onError: (error) => {
      toast.error(`Cập nhập phiếu thất bại: ${error.message}`);
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

  const { data: WarehouseData } = useQuery({
    queryKey: ['warehouse'],
    queryFn: () => {
      return warehouseApi.getAllWarehouse({
        role: userID.role,
        id: userID.id
      });
    }
  });

  const { data: suppliersData } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => suppliersApi.getAllSuplliers(),
    keepPreviousData: true
  });

  const { data: ProductsData } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsApi.getAllProducts(),
    keepPreviousData: true
  });
  console.log(suppliersData);
  const userLogin = userID.name;
  return (
    <MainCard>
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
          WarehouseData={WarehouseData?.data}
        />
      </AddItemDialog>

      <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
        <OrderDetail data={viewItem} />
      </ViewDetailDialog>

      <Box sx={{ height: '100%', width: '100%' }}>
        <DataTable columns={columns} data={OrderData?.data} />
      </Box>
    </MainCard>
  );
}

export default Order;
