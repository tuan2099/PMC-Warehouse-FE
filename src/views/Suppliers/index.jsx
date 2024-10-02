/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Button, IconButton, Box } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ModeEdit as ModeEditIcon, Search as SearchIcon } from '@mui/icons-material';

import suppliersApi from 'api/suppliers.api';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/DataTable';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';
import SupplierDetail from './components/SupplierDetail';
import AddItemDialog from 'ui-component/AddItemDialog';
import SupplierForm from './components/supplierForm';
import { toast } from 'react-toastify';
const INITIAL_STATE = {
  name: '',
  phoneNumber: '',
  email: '',
  address: ''
};

const Suppliers = () => {
  const [openDialog, setOpenDialog] = useState();
  const [viewItem, setViewItem] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [formState, setFormState] = useState({
    suppliersId: null,
    ...INITIAL_STATE
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 200 },
    { field: 'address', headerName: 'Địa chỉ', width: 350 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', width: 200 },
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
          {/* Nút xóa dự án */}
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteSupliers(id)}>
            <DeleteIcon />
          </IconButton>
          {/* Nút chỉnh sửa dự án */}
          <IconButton onClick={() => handleUpdateSupliers(id)}>
            <ModeEditIcon />
          </IconButton>
        </>
      )
    }
  ];

  const { data: suppliersData, refetch } = useQuery({
    queryKey: ['Suppliers', page],
    queryFn: () => suppliersApi.getAllSuplliers(page),
    onSuccess: (data) => {
      // Kiểm tra xem trang hiện tại có vượt quá tổng số trang không, nếu có thì điều chỉnh lại
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          page: data.data.meta.totalPages.toString()
        });
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
      setFormState(INITIAL_STATE);
      setIsEdit(false);
    } else if (dialogId === 'dialog2') {
      setViewItem('');
    }
  };

  const addSuppliers = useMutation({
    mutationFn: (body) => suppliersApi.createSupplier(body),
    onSuccess: () => {
      handleCloseDialog('dialog1');
      alert('Tạo nhà cung cấp mới thành công');
      refetch();
    }
  });

  const getSupplierMutation = useMutation({
    mutationFn: suppliersApi.getSupplierById,
    onSuccess: (data) => {
      setIsEdit(true);
      setFormState({
        suppliersId: data?.data?.supplierDetail.id,
        name: data?.data?.supplierDetail.name,
        phoneNumber: data?.data?.supplierDetail.phoneNumber,
        email: data?.data?.supplierDetail.email,
        address: data?.data?.supplierDetail.address
      });
    }
  });

  const handleUpdateSupliers = (rowId) => {
    getSupplierMutation.mutate(rowId);
    handleOpenDialog('dialog1');
  };

  const updateSuppliers = useMutation({
    mutationFn: ({ suppliersId, values }) => {
      console.log(suppliersId, values);
      if (!suppliersId) {
        throw new Error('Không tìm thấy nhà cung câp');
      }
      return suppliersApi.updateSupplier(Number(suppliersId), values);
    },
    onSuccess: () => {
      toast.success('Cập nhật nhà cung cấp thành công!', {
        position: 'top-right',
        autoClose: 3000, // Tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      refetch();
    },
    onError: (error) => {
      toast.error(`Cập nhật thất bại: ${error.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: suppliersApi.deleteSupplier,
    onSuccess: () => {
      alert('Xóa dự án thành công!'); // Thông báo
      refetch(); // Lấy lại danh sách khách hàng mới
    }
  });

  const handleDeleteSupliers = (rowId) => {
    deleteMutation.mutate(rowId);
  };

  return (
    <MainCard title="Suppliers">
      <Button sx={{ mb: 2 }} onClick={() => handleOpenDialog('dialog1')} variant="outlined" startIcon={<AddIcon />}>
        Tạo Nhà cung cấp
      </Button>

      <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
        <SupplierForm
          addSuppliers={addSuppliers}
          handleCloseDialog={handleCloseDialog}
          updateSuppliers={updateSuppliers}
          formState={formState}
          isEdit={isEdit}
        />
      </AddItemDialog>

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
