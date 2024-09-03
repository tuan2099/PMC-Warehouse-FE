/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// MUI components
import { Box, Dialog, DialogContent, Toolbar, AppBar, Button, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  ModeEdit as ModeEditIcon,
  Close as CloseIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import InfoUser from './components/InfoUser';
import UserForm from './components/UserForm';

// third party
import { useQuery, useMutation } from '@tanstack/react-query';

// Api
import userApi from '../../api/auth.api';

function User() {
  const [isEdit, setIsEdit] = useState([]); //
  const [showPassword, setShowPassword] = useState(false); // điều khiển password strength
  const [openDialog, setOpenDialog] = useState(); // điều khiển đóng mở dialog
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    warehouseId: [],
    customerId: []
  }); // quản lý form
  // Cài đặt column user
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 350 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'date_of_birth', headerName: 'Ngày sinh', width: 110 },
    { field: 'role', headerName: 'Quyền hạn', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteUser(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateUser(id)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog2'), handlegetUser(id);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  // lấy dữ liệu tất cả user
  const { data: userData, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return userApi.getAllUser();
    }
  });

  // Mở dialog
  const handleOpenDialog = (DialogId) => {
    handlegetUser();
    setOpenDialog(DialogId);
    setIsEdit([]);
  };

  // Đóng dialog
  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      setFormState({
        name: '',
        email: '',
        password: '',
        role: '',
        warehouseId: [],
        customerId: []
      });
      setIsEdit(false);
    } else if (dialogId === 'dialog2') {
      setFormState({
        name: '',
        email: '',
        password: '',
        role: '',
        warehouseId: [],
        customerId: []
      });
      setIsEdit(false);
    }
  };

  // Hàm xoá dữ liệu user
  const deletePurchasesMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      refetch();
    }
  });

  const handleDeleteUser = (rowId) => {
    window.confirm('Are you sure you want to delete');
    deletePurchasesMutation.mutate(rowId);
  };

  // Lấy dữ liệu user bằng ID
  const getUserMutation = useMutation({
    mutationFn: userApi.getUserById,
    onSuccess: (data) => {
      setIsEdit(data?.data?.data);
      setFormState({
        name: data?.data?.data?.name,
        email: data?.data?.data?.email,
        password: data?.data?.data?.password,
        role: data?.data?.data?.role,
        warehouseId: data.data.data?.user_warehouses.map((warehouse) => warehouse.id),
        customerId: data.data.data?.user_customers.map((customer) => customer.id)
      });
    }
  });

  const handlegetUser = (rowId) => {
    getUserMutation.mutate(rowId);
  };

  // hàm kiểu tra độ mạnh của mật khẩu
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = () => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  // Tạo user
  const addUserMutation = useMutation({
    mutationFn: (body) => userApi.adduser(body),
    onSuccess: () => {
      alert('Thêm người dùng thành công!');
      refetch();
    }
  });

  // Cập nhật user
  const handleUpdateUser = (rowId) => {
    getUserMutation.mutate(rowId);
    handleOpenDialog('dialog1');
  };

  const updateUserMutation = useMutation({
    mutationFn: ({ userId, values }) => {
      if (!userId) {
        throw new Error('User ID is missing');
      }
      return userApi.updateUser(Number(userId), values);
    },
    onSuccess: (user) => {
      console.log(user);
      alert('Cập nhật người dùng thành công!');
      refetch();
    }
  });

  return (
    <MainCard title="Quản lý người dùng">
      <Button sx={{ mb: 2 }} onClick={() => handleOpenDialog('dialog1')} variant="outlined" startIcon={<AddIcon />}>
        Thêm người dùng
      </Button>

      <Dialog
        onClose={() => handleCloseDialog('dialog1')}
        open={openDialog === 'dialog1'}
        sx={{
          '& .MuiDialogContent-root': {
            height: '400px' // Chiều cao cố định cho phần nội dung
          }
        }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={handleCloseDialog}>
              <CloseIcon color="primary" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <UserForm
            addUserMutation={addUserMutation}
            updateUserMutation={updateUserMutation}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            changePassword={changePassword}
            isEdit={isEdit}
            formState={formState}
            showPassword={showPassword}
            handleCloseDialog={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

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
        <DialogContent>{isEdit && <InfoUser isEdit={isEdit} />}</DialogContent>
      </Dialog>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={userData?.data?.data}
          columns={columns}
          pageSize={5}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
        />
      </Box>
    </MainCard>
  );
}

export default User;
