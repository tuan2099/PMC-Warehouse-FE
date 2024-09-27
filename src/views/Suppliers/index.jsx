/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Button, IconButton, Box } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

import suppliersApi from 'api/suppliers.api';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/DataTable';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';
import SupplierDetail from './components/SupplierDetail';

const INITIAL_STATE = {
  name: '',
  phoneNumber: '',
  email: '',
  address: ''
};

const Suppliers = () => {
  const [openDialog, setOpenDialog] = useState();
  const [viewItem, setViewItem] = useState();
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get('page');
  const [formState, setFormState] = useState({
    ...INITIAL_STATE
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 200 },
    { field: 'address', headerName: 'Địa chỉ', width: 350 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', width: 200 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog2');
              const chooseItem = suppliersData?.data?.data.find((item) => item.id === id);
              setViewItem(chooseItem);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const { data: suppliersData } = useQuery({
    queryKey: ['Suppliers', page],
    queryFn: () => suppliersApi.getAll(page),
    keepPreviousData: true
  });

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
    } else if (dialogId === 'dialog2') {
      setViewItem('');
    }
  };

  console.log(suppliersData);

  return (
    <MainCard title="Suppliers">
      <Button sx={{ mb: 2 }} variant="outlined" startIcon={<AddIcon />}>
        Tạo Nhà cung cấp
      </Button>

      <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
        <SupplierDetail data={viewItem} />
      </ViewDetailDialog>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataTable columns={columns} data={suppliersData} />
      </Box>
    </MainCard>
  );
};

export default Suppliers;
