/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, IconButton, Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import warehouseDispatchApi from '../../api/warehouseDispatch';
import userApi from 'api/auth.api';
import WarehouseDispatchForm from './components/WarehouseDispatchForm';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/DataTable';
import WarehouseDetail from './components/WarehouseDetail';
import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';

const INITIAL_STATE = {
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
};

function WarehouseDispatch() {
  const userDataLogin = JSON.parse(localStorage.getItem('auth_user'));
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [viewItem, setViewItem] = useState();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'exportCode', headerName: 'CODE', width: 350 },
    { field: 'exportDate', headerName: 'Ngày xuất', width: 250 },
    { field: 'exportType', headerName: 'Phân loại', width: 250 },
    { field: 'totalProductQuantity', headerName: 'Tổng số lượng', width: 200 },
    { field: 'totalAmount', headerName: 'Tổng số tiền', width: 200 },
    { field: 'recipient', headerName: 'Người nhận', with: 200 },
    { field: 'exportDescription', headerName: 'Mô tả', with: 200 },
    { field: 'user', headerName: 'Người tạo', with: 200, valueGetter: (params) => params.name },
    { field: 'warehouse', headerName: 'Kho hàng', with: 200, valueGetter: (params) => params.name },
    { field: 'customer', headerName: 'Khách hàng', with: 200, valueGetter: (params) => params.name },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog2');
              const chooseItem = warehouseDispatch?.data?.data.find((item) => item.id === id);
              setViewItem(chooseItem);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const { data: warehouseDispatch } = useQuery({
    queryKey: ['warehouseDispatch', page],
    queryFn: () => warehouseDispatchApi.getAll(page),
    keepPreviousData: true
  });

  const createWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseDispatchApi.createWarehouseDispatch(body)
  });

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
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

        <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
          <WarehouseDispatchForm
            formState={formState}
            createWarehouseMutation={createWarehouseMutation}
            userLogin={userLogin}
            handleCloseDialog={handleCloseDialog}
          />
        </AddItemDialog>

        <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
          <WarehouseDetail data={viewItem} />
        </ViewDetailDialog>

        <Box sx={{ height: '100%', width: '100%' }}>
          <DataTable columns={columns} rows={warehouseDispatch?.data?.data} />
        </Box>
      </MainCard>
    </>
  );
}

export default WarehouseDispatch;
