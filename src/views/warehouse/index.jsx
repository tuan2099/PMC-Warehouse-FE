/* eslint-disable prettier/prettier */
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Dialog,
  DialogContent,
  Toolbar,
  AppBar,
  Button,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  ModeEdit as ModeEditIcon,
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
  Search as SearchIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@tanstack/react-query';
import warehouseApi from '../../api/warehouse.api';

function Warehouse() {
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
          <IconButton onClick={() => handleUpdateUser(id)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => console.log(123)}>
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

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

  // update warehouse

  return (
    <>
      <MainCard title="Quản lý kho hàng">
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid rows={WarehouseData?.data} columns={columns} pageSize={5} checkboxSelection />
        </Box>
      </MainCard>
    </>
  );
}

export default Warehouse;
