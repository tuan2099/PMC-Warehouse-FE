/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, IconButton, Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Add as AddIcon, Search as SearchIcon, ModeEdit as ModeEditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import warehouseDispatchApi from '../../api/warehouseDispatch';
import userApi from 'api/auth.api';
import WarehouseDispatchForm from './components/WarehouseDispatchForm';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/DataTable';
import WarehouseDetail from './components/WarehouseDetail';
import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';

function WarehouseDispatch() {
  const userDataLogin = JSON.parse(localStorage.getItem('auth_user'));
  const [openDialog, setOpenDialog] = useState();
  const [viewItem, setViewItem] = useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page');

  const columns = [
    { field: 'exportCode', headerName: 'CODE', width: 350 },
    { field: 'exportDate', headerName: 'Ngày xuất', width: 250 },
    { field: 'exportType', headerName: 'Phân loại', width: 250 },
    { field: 'totalProductQuantity', headerName: 'Tổng số lượng', width: 200 },
    { field: 'totalAmount', headerName: 'Tổng số tiền', width: 200 },
    { field: 'recipient', headerName: 'Người nhận', with: 200 },
    { field: 'exportDescription', headerName: 'Mô tả', with: 200 },
    { field: 'user', headerName: 'Người tạo', with: 200, valueGetter: (params) => params.name },
    // { field: 'warehouse', headerName: 'Kho hàng', with: 200, valueGetter: (params) => params.name },
    // { field: 'customer', headerName: 'Khách hàng', with: 200, valueGetter: (params) => params.name },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteWHDP(id)}>
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
              navigate(`?mode=view&id=${id}`, { replace: true });
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

  const { data: warehouseDispatch, refetch } = useQuery({
    queryKey: ['warehouseDispatch', page],
    queryFn: () => warehouseDispatchApi.getAll(page),
    keepPreviousData: true
  });

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
    navigate('', { replace: true });
  };

  const deleteWHDPMutation = useMutation({
    mutationFn: (id) => warehouseDispatchApi.delete(id),
    onSuccess: () => {
      alert('Xóa dự án thành công!');
      refetch();
    }
  });

  const handleDeleteWHDP = (id) => {
    window.confirm('Are you sure you want to delete');
    deleteWHDPMutation.mutate(id);
  };

  const { data: userDetail } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return userApi.getUserById(userDataLogin.id);
    }
  });

  const userLogin = userDetail?.data?.data;

  const createWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseDispatchApi.createWarehouseDispatch(body),
    onSuccess: () => {
      handleCloseDialog('dialog1');
      refetch();
    }
  });

  return (
    <>
      <MainCard title="Thông tin xuất kho">
        <Button
          sx={{ mb: 2 }}
          variant="outlined"
          onClick={() => {
            navigate(`?mode=add`, { replace: true });
            handleOpenDialog('dialog1');
          }}
          startIcon={<AddIcon />}
        >
          Tạo Đơn xuất
        </Button>

        <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
          <WarehouseDispatchForm
            // formState={formState}
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
