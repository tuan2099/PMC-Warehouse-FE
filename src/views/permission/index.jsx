/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';
import DataTable from 'ui-component/DataTable';
import permApi from 'api/perm.api';
import PermForm from './components/PermForm';

function Permission() {
  const [openDialog, setOpenDialog] = useState();

  const navigate = useNavigate();

  const handleOpenDialog = (DialogId) => {
    setOpenDialog(DialogId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
    navigate('', { replace: true });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 250 },
    { field: 'action', headerName: 'Hành động', width: 250 },
    { field: 'description', headerName: 'Mô tả', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeletePermission(id)}>
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
        </>
      )
    }
  ];

  const { data: PermData, refetch } = useQuery({
    queryKey: ['permisson'], // Thêm id và role vào queryKey
    queryFn: () => permApi.getAllPerm(),
    keepPreviousData: true // Giữ dữ liệu cũ trước khi có dữ liệu mới
  });

  const deletePermisson = useMutation({
    mutationFn: (id) => permApi.deletePerm(id),
    onSuccess: () => {
      alert('Xóa dự án thành công!');
      refetch();
    }
  });

  const handleDeletePermission = (id) => {
    window.confirm('Are you sure you want to delete');
    deletePermisson.mutate(id);
  };

  return (
    <>
      <MainCard title="Quản lý quyền hạn">
        <Button
          sx={{ mb: 2 }}
          onClick={() => {
            navigate(`?mode=add`, { replace: true });
            handleOpenDialog('dialog1');
          }}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Thêm quyền
        </Button>
        <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
          <PermForm onClose={handleCloseDialog} reLoadData={refetch} />
        </AddItemDialog>
        <ViewDetailDialog></ViewDetailDialog>
        <Box sx={{ width: '100%', height: '600px' }}>
          <DataTable columns={columns} data={PermData} />
        </Box>
      </MainCard>
    </>
  );
}

export default Permission;
