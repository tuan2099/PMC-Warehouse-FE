/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Dialog, DialogContent, Toolbar, AppBar, Button, IconButton } from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  ModeEdit as ModeEditIcon,
  Close as CloseIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useQuery, useMutation } from '@tanstack/react-query';
import customerApi from 'api/customer.api';
import CustomerForm from './components/customerForm';
import InfoCustomer from './components/InfoCustomer';
function Customer() {
  const [openDialog, setOpenDialog] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [formState, setFormState] = useState({
    userId: null,
    name: '',
    pm: '',
    location: '',
    branch: '',
    representative: '',
    status: '',
    phoneNumber: '',
    note: ''
  });
  const [userInfo, setUserInfo] = useState([]);

  // Open & close ---> Dialog
  const handleOpenDialog = (DialogId) => {
    setIsEdit(false);
    setOpenDialog(DialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      setFormState({
        name: ''
      });
    } else if (dialogId === 'dialog2') {
      setFormState({
        name: ''
      });
    }
  };
  // Call api get customers
  const { data: customerData, refetch } = useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      const response = await customerApi.getAllCustomer();
      return response;
    },
    keepPreviousData: true
  });
  // Setting columns for table customer
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 250 },
    { field: 'pm', headerName: 'GĐTN', width: 250 },
    { field: 'location', headerName: 'Địa chỉ', width: 150 },
    { field: 'branch', headerName: 'Chi nhánh', width: 150 },
    { field: 'representative', headerName: 'Người đại diện', width: 150 },
    { field: 'status', headerName: 'Trạng thái', width: 150 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', width: 150 },
    { field: 'note', headerName: 'Ghi chú', width: 150 },

    {
      field: 'actions',
      headerName: 'Actions',
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
  // call api add customer
  const addCustomer = useMutation({
    mutationFn: (body) => customerApi.creteCustomer(body),
    onSuccess: () => {
      handleCloseDialog('dialog1');
      alert('Thêm dự án thành công!');
      refetch();
    }
  });

  // call api delete customer
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

  // call api get customer by id
  const getCustomerMutation = useMutation({
    mutationFn: customerApi.getCustomer,
    onSuccess: (data) => {
      setIsEdit(true);
      setUserInfo(data);
      setFormState({
        userId: data?.data?.customerDetail?.id,
        name: data?.data?.customerDetail?.name,
        pm: data?.data?.customerDetail?.pm,
        location: data?.data?.customerDetail?.location,
        branch: data?.data?.customerDetail?.branch,
        representative: data?.data?.customerDetail?.representative,
        status: data?.data?.customerDetail?.status,
        phoneNumber: data?.data?.customerDetail?.phoneNumber,
        note: data?.data?.customerDetail?.note
      });
    }
  });

  // call api update customer
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
    onSuccess: (customer) => {
      console.log(customer);
      alert('Cập nhật dự án thành công');
      refetch();
    }
  });

  //
  const handlegetInfoCustomer = (rowId) => {
    getCustomerMutation.mutate(rowId);
  };

  return (
    <>
      <MainCard title="Quản lý Dự án">
        <Button sx={{ mb: 2 }} onClick={() => handleOpenDialog('dialog1')} variant="outlined" startIcon={<AddIcon />}>
          Thêm dự án
        </Button>
        <Dialog
          onClose={() => handleCloseDialog('dialog1')}
          open={openDialog === 'dialog1'}
          sx={{
            '& .MuiDialogContent-root': {
              height: '400px' // Chiều cao cố định cho phần nội dung
            }
          }}
          maxWidth="xl"
          fullWidth
        >
          <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="close" onClick={handleCloseDialog}>
                <CloseIcon color="primary" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <CustomerForm
              updateCustomer={updateCustomer}
              addCustomer={addCustomer}
              formState={formState}
              handleCloseDialog={handleCloseDialog}
              isEdit={isEdit}
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
          <DialogContent>{isEdit && <InfoCustomer handleDeleteCustomer={handleDeleteCustomer} userInfo={userInfo} />}</DialogContent>
        </Dialog>

        <Box sx={{ width: '100%', height: '600px' }}>
          <DataGrid
            rowHeight={70}
            rows={customerData?.data}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            pagination
            checkboxSelection
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true
              }
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </MainCard>
    </>
  );
}

export default Customer;
