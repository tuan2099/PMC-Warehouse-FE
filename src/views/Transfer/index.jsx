/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Button, IconButton, Box } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import transferApi from 'api/transfer.api';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/DataTable';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';
import TransferDetail from './components/TransferDetail';
import AddItemDialog from 'ui-component/AddItemDialog';
import TransferForm from './components/TransferForm';
import userApi from 'api/auth.api';
import productsApi from '../../api/product.api';

const Suppliers = () => {
  const [openDialog, setOpenDialog] = useState();
  const [viewItem, setViewItem] = useState();
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get('page');
  const navigate = useNavigate();
  const userDataLogin = JSON.parse(localStorage.getItem('auth_user'));

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 350 },
    { field: 'fromWarehouseID', headerName: 'Kho gốc', width: 200 },
    { field: 'toWarehouseID', headerName: 'Kho đến', width: 250 },
    { field: 'note', headerName: 'Ghi chú', width: 200 },
    { field: 'userID', headerName: 'Người tạo', width: 200 },
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
              const chooseItem = transferData?.data?.data.find((item) => item.id === id);
              setViewItem(chooseItem);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const { data: transferData } = useQuery({
    queryKey: ['transfer', page],
    queryFn: () => transferApi.getAll(page),
    keepPreviousData: true
  });

  const { data: userDetail } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return userApi.getUserById(userDataLogin.id);
    }
  });

  const { data: ProductsData } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => await productsApi.getAllProducts(page),
    onSuccess: (data) => {
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: data.data.meta.totalPages.toString() });
      }
    },
    keepPreviousData: true
  });

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      console.log('hi');
    } else if (dialogId === 'dialog2') {
      setViewItem('');
    }
  };

  const createTransferMutation = useMutation({
    mutationFn: (body) => transferApi.createTransfer(body)
  });

  const updateTransferMutation = useMutation({
    mutationFn: (data) => {
      return transferApi.updateTransfer(data.id, data.body);
    }
  });

  const userLogin = userDetail?.data?.data;

  return (
    <MainCard title="Suppliers">
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        onClick={() => {
          navigate(`?mode=add`, { replace: true });
          handleOpenDialog('dialog1');
        }}
        startIcon={<AddIcon />}
      >
        Tạo Đơn chuyển
      </Button>

      <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
        <TransferForm ProductsData={ProductsData} userLogin={userLogin} createTransferMutation={createTransferMutation} />
      </AddItemDialog>

      <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
        <TransferDetail data={viewItem} />
      </ViewDetailDialog>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataTable columns={columns} data={transferData} />
      </Box>
    </MainCard>
  );
};

export default Suppliers;
