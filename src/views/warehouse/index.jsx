/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// Các thành phần MUI
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

// Thư viện bên thứ ba
import { useMutation, useQuery } from '@tanstack/react-query';

// API
import warehouseApi from '../../api/warehouse.api';

// Các thành phần tùy chỉnh
import WarehouseForm from './components/WarehouseForm';
import InfoWarehouse from './components/InfoWarehouse';

function Warehouse() {
  const [isEdit, setIsEdit] = useState(); // State quản lý trạng thái chỉnh sửa
  const [warehouseId, setWarehouseId] = useState(); // Lưu ID của kho đang được chỉnh sửa
  const [openDialog, setOpenDialog] = useState(); // Quản lý trạng thái đóng/mở của dialog
  const [formState, setFormState] = useState({
    name: '',
    address: '',
    note: '',
    type: '',
    info: ''
  }); // Trạng thái của form

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
      headerName: 'Actions', // Cột hành động
      width: 220,
      renderCell: ({ id }) => (
        <>
          {/* Nút xóa kho hàng */}
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteWarehouse(id)}>
            <DeleteIcon />
          </IconButton>
          {/* Nút chỉnh sửa kho hàng */}
          <IconButton onClick={() => handleUpdateWarehouse(id)}>
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

  // Hàm mở dialog
  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  // Hàm đóng dialog
  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      setFormState({
        name: '',
        address: '',
        note: '',
        type: '',
        info: ''
      });
      setIsEdit(false);
    } else if (dialogId === 'dialog2') {
      // Reset state cho dialog2 nếu cần
    }
  };

  // Lấy dữ liệu kho hàng bằng ID
  const getWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseApi.getWarehouseById(body),
    onSuccess: (warehouse) => {
      const warehouseData = warehouse?.data?.simplifiedWarehouseDetail;
      setWarehouseId(warehouseData); // Lưu thông tin kho hàng vào state
      setIsEdit(warehouseData); // Đặt trạng thái chỉnh sửa
      setFormState({
        name: warehouseData.name,
        address: warehouseData.address
      });
    }
  });

  // Hàm lấy thông tin chi tiết kho hàng
  const handleGetWarehouse = (rowID) => {
    getWarehouseMutation.mutate(rowID);
  };

  // Lấy tất cả dữ liệu kho hàng
  const { data: WarehouseData, refetch } = useQuery({
    queryKey: ['warehouse'],
    queryFn: () => {
      return warehouseApi.getAllWarehouse();
    }
  });

  // Xóa kho hàng
  const deleteWarehouseMutation = useMutation({
    mutationFn: warehouseApi.deleteWarehouse,
    onSuccess: () => {
      alert('Xóa kho hàng thành công');
      refetch(); // Lấy lại danh sách kho hàng sau khi xóa
    },
    onError: () => {
      alert('Xóa kho hàng thất bại');
      refetch();
    }
  });

  const handleDeleteWarehouse = (rowId) => {
    if (window.confirm('Are you sure you want to delete')) {
      deleteWarehouseMutation.mutate(rowId); // Gọi hàm xóa kho hàng
    }
  };

  // Thêm mới kho hàng
  const createWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseApi.addWarehouse(body),
    onSuccess: (warehouse) => {
      console.log(warehouse);
      alert('Thêm kho thành công!');
      refetch();
    }
  });

  // Cập nhật kho hàng
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
          <DataGrid rows={WarehouseData?.data} columns={columns} pageSize={5} checkboxSelection />
        </Box>
      </MainCard>
    </>
  );
}

export default Warehouse;
