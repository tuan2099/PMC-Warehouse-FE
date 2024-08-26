/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Dialog, DialogContent, Toolbar, AppBar, Button, IconButton } from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  ModeEdit as ModeEditIcon,
  Close as CloseIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@tanstack/react-query';
import warehouseApi from '../../api/warehouse.api';
import WarehouseForm from './components/WarehouseForm';

function Warehouse() {
  const [isEdit, setIsEdit] = useState();
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState({
    name: '',
    address: '',
    note: '',
    type: '',
    info: ''
  });

  // setting columns for table users
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên kho', width: 350 },
    { field: 'address', headerName: 'Địa chỉ kho', width: 250 },
    { field: 'note', headerName: 'Ghi chú', width: 250 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 200 },
    { field: 'updatedAt', headerName: 'Ngày cập nhật gần nhất', with: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteWarehouse(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateWarehouse(id)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => console.log(123)}>
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  // Open & close ---> Dialog
  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
    console.log(dialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      setFormState({
        name: '',
        email: '',
        password: '',
        role: ''
      });
      setIsEdit(false);
    } else if (dialogId === 'dialog2') {
      // Reset state cho dialog2 nếu cần
    }
  };
  // get warehouse
  const getWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseApi.getWarehouseById(body),
    onSuccess: (warehouse) => {
      const warehouseData = warehouse?.data?.warehouseDetail;
      setIsEdit(warehouseData);
      setFormState({
        name: warehouseData.name,
        address: warehouseData.address
        // note: warehouseData.note,
        // type: warehouseData.type,
        // info: warehouseData.info
      });
    }
  });
  // get api all warehouse
  const { data: WarehouseData, refetch } = useQuery({
    queryKey: ['warehouse'],
    queryFn: () => {
      return warehouseApi.getAllWarehouse();
    }
  });
  // delete warehouse
  const deleteWarehouseMutation = useMutation({
    mutationFn: warehouseApi.deleteWarehouse,
    onSuccess: () => {
      alert('Xóa kho hàng thành công');
      refetch();
    },
    onError: () => {
      alert('Xóa kho hàng thất bại');
      refetch();
    }
  });
  const handleDeleteWarehouse = (rowId) => {
    window.confirm('Are you sure you want to delete');
    deleteWarehouseMutation.mutate(rowId);
  };

  // add new warehouse
  const createWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseApi.addWarehouse(body),
    onSuccess: (warehouse) => {
      console.log(warehouse);
      alert('Thêm kho thành công!');
      refetch();
    }
  });
  // update warehouse
  const handleUpdateWarehouse = (rowId) => {
    getWarehouseMutation.mutate(rowId);
    handleOpenDialog('dialog1');
  };

  const updateWarehouseMutaiton = useMutation({
    mutationFn: ({ warehouseId, values }) => {
      console.log(warehouseId, values);
      if (!warehouseId) {
        throw new Error('User ID is missing');
      }
      return warehouseApi.updateWarehouse(Number(warehouseId), values);
    },
    onSuccess: (warehouse) => {
      console.log(warehouse);
      alert('Cập nhật kho thành công!');
      refetch();
    }
  });
  return (
    <>
      <MainCard title="Quản lý kho hàng">
        <Button
          sx={{ mb: 2 }}
          variant="outlined"
          onClick={() => {
            handleOpenDialog('dialog1');
          }}
          startIcon={<AddIcon />}
        >
          Tạo kho hàng
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
            <WarehouseForm
              updateWarehouseMutaiton={updateWarehouseMutaiton}
              isEdit={isEdit}
              formState={formState}
              handleCloseDialog={handleCloseDialog}
              createWarehouseMutation={createWarehouseMutation}
            />
          </DialogContent>
        </Dialog>

        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid rows={WarehouseData?.data} columns={columns} pageSize={5} checkboxSelection />
        </Box>
      </MainCard>
    </>
  );
}

export default Warehouse;
