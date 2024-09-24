/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
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
import InfoWarehouse from './components/InfoWarehouse';
import DataTable from 'ui-component/DataTable';

INITIAL_STATE = {
  name: '',
  address: '',
  note: '',
  type: '',
  info: ''
};

function Warehouse() {

  const [isEdit, setIsEdit] = useState();
  const [warehouseId, setWarehouseId] = useState();
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  // Cấu hình các cột cho bảng dữ liệu kho hàng

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

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      setFormState(INITIAL_STATE);
      setIsEdit(false);
    } else if (dialogId === 'dialog2') {
    }
  };

  const getWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseApi.getWarehouseById(body),
    onSuccess: (warehouse) => {
      const warehouseData = warehouse?.data?.simplifiedWarehouseDetail;
      setWarehouseId(warehouseData);
      setIsEdit(warehouseData);
      setFormState({
        name: warehouseData.name,
        address: warehouseData.address
      });
    }
  });

  const handleGetWarehouse = (rowID) => {
    getWarehouseMutation.mutate(rowID);
  };

  const { data: WarehouseData, refetch } = useQuery({
    queryKey: ['warehouse'],
    queryFn: () => warehouseApi.getAllWarehouse(page),
    onSuccess: (data) => {
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: data.data.meta.totalPages.toString() });
      }
    },
    keepPreviousData: true
  });

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
    if (window.confirm('Are you sure you want to delete')) {
      deleteWarehouseMutation.mutate(rowId);
    }
  };

  const createWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseApi.addWarehouse(body),
    onSuccess: () => {
      alert('Thêm kho thành công!');
      refetch();
    }
  });

  const handleUpdateWarehouse = (rowId) => {
    getWarehouseMutation.mutate(rowId); // Lấy thông tin kho hàng
    handleOpenDialog('dialog1'); // Mở dialog cập nhật
  };

  const updateWarehouseMutaiton = useMutation({
    mutationFn: ({ warehouseId, values }) => {
      if (!warehouseId) {
        throw new Error('Warehouse ID is missing');
      }
      return warehouseApi.updateWarehouse(Number(warehouseId), values); // Gọi API cập nhật kho hàng
    },
    onSuccess: (warehouse) => {
      console.log(warehouse);
      alert('Cập nhật kho thành công!');
      refetch(); // Lấy lại danh sách kho hàng sau khi cập nhật
    }
  });

  return (
    <>
      <MainCard title="Quản lý kho hàng">
        {/* Nút tạo mới kho hàng */}
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

        {/* Dialog cho việc thêm/chỉnh sửa kho hàng */}
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

        {/* Dialog xem thông tin chi tiết kho hàng */}
        <Dialog
          onClose={() => handleCloseDialog('dialog2')}
          open={openDialog === 'dialog2'}
          maxWidth="xl"
          fullWidth
          sx={{
            '& .MuiDialogContent-root': {
              height: '85%', // Chiều cao cố định cho phần nội dung
              minHeight: '700px'
            }
          }}
        >
          <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="close" onClick={() => handleCloseDialog('dialog2')}>
                <CloseIcon color="primary" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <InfoWarehouse warehouseId={warehouseId} />
          </DialogContent>
        </Dialog>

        {/* Bảng dữ liệu kho hàng */}
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataTable rows={WarehouseData} columns={columns} />
        </Box>
      </MainCard>
    </>
  );
}

export default Warehouse;
