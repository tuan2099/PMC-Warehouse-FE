/* eslint-disable prettier/prettier */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { useQuery, useMutation } from '@tanstack/react-query';
import userApi from '../../api/auth.api';
import Formsetting from '../../ui-component/form';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UserForm from './component/userForm';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MainCard from 'ui-component/cards/MainCard';

// Define columns for data grid

function User() {
  const [userDetail, setUserDetail] = useState();
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 350 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'date_of_birth', headerName: 'Ngày sinh', width: 110 },
    { field: 'role', headerName: 'Quyền hạn', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteUser(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateUser(id)}>
            <ModeEditIcon />
          </IconButton>
        </>
      )
    }
  ];
  // call Api get user
  const { data: userData, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return userApi.getAllUser();
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  // opent Dialog - close
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // call Api delete user
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
  // call Api get users
  const getUserMutation = useMutation({
    mutationFn: userApi.getUserById,
    onSuccess: (data) => {
      // console.log(data);
      setUserDetail(data?.data?.userData);
    }
  });

  const handleUpdateUser = (rowId) => {
    // console.log(rowId);
    getUserMutation.mutate(rowId);
    handleOpenDialog();
  };

  return (
    <MainCard title="Quản lý người dùng">
      <Button onClick={handleOpenDialog} variant="outlined" startIcon={<AddIcon />}>
        Thêm người dùng
      </Button>
      <Formsetting
        open={openDialog}
        onClose={handleCloseDialog}
        UserForm={
          <UserForm
            onClose={handleCloseDialog}
            handleDeleteUser={handleDeleteUser}
            handleUpdateUser={handleUpdateUser}
            userDetail={userDetail}
          />
        }
      />
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid rows={userData?.data} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </MainCard>
  );
}

export default User;
