/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ModeEdit as ModeEditIcon, Search as SearchIcon } from '@mui/icons-material';
import { useQuery, useMutation } from '@tanstack/react-query';
import MainCard from 'ui-component/cards/MainCard';
import InfoUser from './components/InfoUser';
import UserForm from './components/UserForm';
import userApi from '../../api/auth.api';
import DataTable from 'ui-component/DataTable';
import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  role: '',
  warehouseId: [],
  customerId: []
};

function User() {
  const [isEdit, setIsEdit] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

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

  const { data: userData, refetch } = useQuery({
    queryKey: ['users', page],
    queryFn: () => userApi.getAllUser(page),
    onSuccess: (data) => {
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: data.data.meta.totalPages.toString() });
      }
    },
    keepPreviousData: true
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

  const getUserMutation = useMutation({
    mutationFn: (id) => userApi.getUserById(id),
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const addUserMutation = useMutation({
    mutationFn: (body) => userApi.adduser(body),
    onSuccess: () => {
      alert('Thêm người dùng thành công!');
      refetch();
    }
  });

  const handleUpdateUser = (id) => {
    getUserMutation.mutate(id);
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

      <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
        <UserForm
          addUserMutation={addUserMutation}
          updateUserMutation={updateUserMutation}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          isEdit={isEdit}
          formState={formState}
          showPassword={showPassword}
          handleCloseDialog={handleCloseDialog}
        />
      </AddItemDialog>

      <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
        {isEdit && <InfoUser isEdit={isEdit} />}
      </ViewDetailDialog>

      <Box sx={{ height: '100%', width: '100%' }}>
        <DataTable columns={columns} rows={userData?.data?.users} />
      </Box>
    </MainCard>
  );
}

export default User;
