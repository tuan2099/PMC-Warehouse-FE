/* eslint-disable prettier/prettier */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../api/auth.api';
import Formsetting from '../../ui-component/form';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UserForm from './component/userForm';
// Define columns for data grid
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
    renderCell: (params) => (
      <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}>
        <DeleteIcon />
      </IconButton>
    )
  }
];

function User() {
  // call Api get user
  const { data: userData } = useQuery({
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
    // refetch();
  };
  return (
    <div>
      <Button onClick={handleOpenDialog} variant="contained" color="primary">
        Thêm người dùng
      </Button>
      <Formsetting open={openDialog} onClose={handleCloseDialog} UserForm={<UserForm onClose={handleCloseDialog} />} />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={userData?.data} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </div>
  );
}

export default User;
