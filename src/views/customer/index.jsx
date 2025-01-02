import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ModeEdit as ModeEditIcon, Search as SearchIcon } from '@mui/icons-material';
import { useQuery, useMutation } from '@tanstack/react-query';
import customerApi from 'api/customer.api';
import CustomerForm from './components/customerForm';
import InfoCustomer from './components/InfoCustomer';
import DataTable from 'ui-component/DataTable';
import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';

const INITIAL_STATE = {
  name: '',
  pm: '',
  location: '',
  branch: '',
  representative: '',
  status: '',
  phoneNumber: '',
  note: ''
};

function Customer() {
  const [openDialog, setOpenDialog] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [formState, setFormState] = useState({
    userId: null,
    ...INITIAL_STATE
  });

  const [customerInfo, setcustomerInfo] = useState([]);

  const handleOpenDialog = (DialogId) => {
    setIsEdit(false);
    setOpenDialog(DialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      setFormState(INITIAL_STATE);
    } else if (dialogId === 'dialog2') {
      setFormState({
        name: ''
      });
    }
  };

  const userID = JSON.parse(localStorage.getItem('auth_user'));

  const {
    data: customerData,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      const headers = {
        role: userID.role,
        id: userID.id
      };
      return customerApi.getAllCustomer(headers);
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 250 },
    { field: 'pm', headerName: 'GĐTN', width: 250 },
    { field: 'location', headerName: 'Địa chỉ', width: 150 },
    { field: 'branch', headerName: 'Chi nhánh', width: 150 },
    { field: 'status', headerName: 'Trạng thái', width: 150 },
    {
      field: 'actions',
      headerName: '',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteCustomer(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateCustomer(id)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog2'), handlegetInfoCustomer(id);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const addCustomer = useMutation({
    mutationFn: (body) => customerApi.creteCustomer(body),
    onSuccess: () => {
      handleCloseDialog('dialog1');
      alert('Thêm dự án thành công!');
      refetch();
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: customerApi.deleteCustomer,
    onSuccess: () => {
      alert('Xóa dự án thành công!');
      refetch();
    }
  });

  const handleDeleteCustomer = (rowId) => {
    window.confirm('Are you sure you want to delete');
    deleteUserMutation.mutate(rowId);
  };

  const getCustomerMutation = useMutation({
    mutationFn: (body) => customerApi.getCustomer(body),
    onSuccess: (customer) => {
      const customerData = customer?.data?.simplifiedcustomerDetail;
      setIsEdit(true);
      setcustomerInfo(customerData);
      setFormState({
        userId: customerData.id,
        name: customerData.name,
        pm: customerData.pm,
        location: customerData.location,
        branch: customerData.branch,
        representative: customerData.representative,
        status: customerData.status,
        phoneNumber: customerData.phoneNumber,
        note: customerData.note
      });
    }
  });

  const handlegetInfoCustomer = (rowId) => {
    getCustomerMutation.mutate(rowId);
  };

  const handleUpdateCustomer = (rowId) => {
    getCustomerMutation.mutate(rowId);
    handleOpenDialog('dialog1');
  };

  const updateCustomer = useMutation({
    mutationFn: ({ customerId, values }) => {
      if (!customerId) {
        throw new Error('Không timg thấy dự án');
      }
      return customerApi.updateCustomer(Number(customerId), values);
    },
    onSuccess: () => {
      alert('Cập nhật dự án thành công');
      refetch();
    }
  });

  return (
    <>
      <MainCard>
        <Button sx={{ mb: 2 }} onClick={() => handleOpenDialog('dialog1')} variant="outlined" startIcon={<AddIcon />}>
          Thêm dự án
        </Button>

        <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
          <CustomerForm
            updateCustomer={updateCustomer}
            addCustomer={addCustomer}
            formState={formState}
            handleCloseDialog={handleCloseDialog}
            isEdit={isEdit}
          />
        </AddItemDialog>

        <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
          <InfoCustomer customerInfo={customerInfo} />
        </ViewDetailDialog>

        <Box sx={{ width: '100%', height: '100%' }}>
          <DataTable columns={columns} rows={customerData?.data} isLoading={isLoading} />
        </Box>
      </MainCard>
    </>
  );
}

export default Customer;
