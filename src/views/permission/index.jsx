/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
// Các thành phần MUI
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ModeEdit as ModeEditIcon, Search as SearchIcon } from '@mui/icons-material';
import { useQuery, useMutation } from '@tanstack/react-query';
import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';
import DataTable from 'ui-component/DataTable';
import permApi from 'api/perm.api';
import PermForm from './components/PermForm';
const INITIAL_STATE = {
  name: '',
  action: '',
  description: ''
};

function Permission() {
  const [openDialog, setOpenDialog] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [formState, setFormState] = useState({
    ...INITIAL_STATE
  });

  const handleOpenDialog = (DialogId) => {
    setIsEdit(false); // Khi mở form thêm, đặt trạng thái không phải chỉnh sửa
    setOpenDialog(DialogId); // Đặt ID của dialog để mở
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null); // Đóng dialog
    if (dialogId === 'dialog1') {
      // Đặt lại giá trị form nếu là dialog1 (form thêm hoặc chỉnh sửa)
      setFormState(INITIAL_STATE);
    } else if (dialogId === 'dialog2') {
      // Đặt lại giá trị form nếu là dialog2
      setFormState({
        name: ''
      });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 250 },
    { field: 'action', headerName: 'GĐTN', width: 250 },
    { field: 'description', headerName: 'Địa chỉ', width: 150 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      renderCell: ({ id }) => (
        <>
          {/* Nút xóa dự án */}
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteCustomer(id)}>
            <DeleteIcon />
          </IconButton>
          {/* Nút chỉnh sửa dự án */}
          <IconButton>
            <ModeEditIcon />
          </IconButton>
          {/* Nút xem chi tiết dự án */}
          <IconButton>
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const { data: PermData, refetch } = useQuery({
    queryKey: ['customer'], // Thêm id và role vào queryKey
    queryFn: async () => {
      // Gọi API với id và role được truyền vào
      const response = await permApi.getAllCustomer();
      return response; // Trả về kết quả từ API
    },
    keepPreviousData: true // Giữ dữ liệu cũ trước khi có dữ liệu mới
  });

  const addPerm = useMutation({
    mutationFn: (body) => permApi.creteCustomer(body), // Gọi API thêm khách hàng
    onSuccess: () => {
      handleCloseDialog('dialog1'); // Đóng dialog sau khi thành công
      alert('Thêm dự án thành công!'); // Thông báo
      refetch(); // Lấy lại danh sách khách hàng mới
    }
  });

  return (
    <>
      <MainCard title="Quản lý quyền hạn">
        <Button sx={{ mb: 2 }} onClick={() => handleOpenDialog('dialog1')} variant="outlined" startIcon={<AddIcon />}>
          Thêm quyền
        </Button>
        <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
          <PermForm formState={formState} addPerm={addPerm} handleCloseDialog={handleCloseDialog} isEdit={isEdit} />
        </AddItemDialog>
        <ViewDetailDialog></ViewDetailDialog>
        <Box sx={{ width: '100%', height: '600px' }}>
          <DataTable columns={columns} rows={PermData?.data?.data} />
        </Box>
      </MainCard>
    </>
  );
}

export default Permission;
