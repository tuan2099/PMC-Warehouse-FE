/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Các thành phần MUI
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

// Thư viện bên thứ ba
import { useQuery, useMutation } from '@tanstack/react-query';

// API
import customerApi from 'api/customer.api';
import CustomerForm from './components/customerForm'; // Form khách hàng
import InfoCustomer from './components/InfoCustomer'; // Thông tin khách hàng
import DataTable from 'ui-component/DataTable';

function Customer() {
  // State quản lý dialog đóng/mở
  const [openDialog, setOpenDialog] = useState();
  // State điều chỉnh trạng thái form là thêm hay chỉnh sửa
  const [isEdit, setIsEdit] = useState(false);
  // State lưu trữ giá trị form
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
  // State lưu dữ liệu người dùng lấy từ API
  const [userInfo, setUserInfo] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  // Hàm mở dialog theo ID
  const handleOpenDialog = (DialogId) => {
    setIsEdit(false); // Khi mở form thêm, đặt trạng thái không phải chỉnh sửa
    setOpenDialog(DialogId); // Đặt ID của dialog để mở
  };

  // Hàm đóng dialog theo ID và thiết lập lại form khi đóng
  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null); // Đóng dialog
    if (dialogId === 'dialog1') {
      // Đặt lại giá trị form nếu là dialog1 (form thêm hoặc chỉnh sửa)
      setFormState({
        name: '',
        pm: '',
        location: '',
        branch: '',
        representative: '',
        status: '',
        phoneNumber: '',
        note: ''
      });
    } else if (dialogId === 'dialog2') {
      // Đặt lại giá trị form nếu là dialog2
      setFormState({
        name: ''
      });
    }
  };

  // Gọi API lấy danh sách khách hàng
  const { data: customerData, refetch } = useQuery({
    queryKey: ['customer', page], // Tên key truy vấn
    queryFn: async () => {
      const response = await customerApi.getAllCustomer(); // Gọi API
      return response; // Trả về kết quả từ API
    },
    onSuccess: (data) => {
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: data.data.meta.totalPages.toString() });
      }
    },
    keepPreviousData: true // Giữ dữ liệu trước khi có dữ liệu mới
  });

  // Cấu hình cột cho bảng dữ liệu
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 250 },
    { field: 'pm', headerName: 'GĐTN', width: 250 },
    { field: 'location', headerName: 'Địa chỉ', width: 150 },
    { field: 'branch', headerName: 'Chi nhánh', width: 150 },
    { field: 'status', headerName: 'Trạng thái', width: 150 },
    {
      field: 'actions', // Cột hành động
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          {/* Nút xóa dự án */}
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteCustomer(id)}>
            <DeleteIcon />
          </IconButton>
          {/* Nút chỉnh sửa dự án */}
          <IconButton onClick={() => handleUpdateCustomer(id)}>
            <ModeEditIcon />
          </IconButton>
          {/* Nút xem chi tiết dự án */}
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

  // Mutation để thêm khách hàng
  const addCustomer = useMutation({
    mutationFn: (body) => customerApi.creteCustomer(body), // Gọi API thêm khách hàng
    onSuccess: () => {
      handleCloseDialog('dialog1'); // Đóng dialog sau khi thành công
      alert('Thêm dự án thành công!'); // Thông báo
      refetch(); // Lấy lại danh sách khách hàng mới
    }
  });

  // Mutation để xóa khách hàng
  const deleteUserMutation = useMutation({
    mutationFn: customerApi.deleteCustomer, // Gọi API xóa khách hàng
    onSuccess: () => {
      alert('Xóa dự án thành công!'); // Thông báo
      refetch(); // Lấy lại danh sách khách hàng mới
    }
  });

  // Hàm xử lý xóa khách hàng
  const handleDeleteCustomer = (rowId) => {
    window.confirm('Are you sure you want to delete'); // Xác nhận trước khi xóa
    deleteUserMutation.mutate(rowId); // Gọi mutation để xóa
  };

  // Mutation để lấy thông tin khách hàng theo ID
  const getCustomerMutation = useMutation({
    mutationFn: customerApi.getCustomer, // Gọi API lấy thông tin khách hàng
    onSuccess: (data) => {
      setIsEdit(true); // Đặt trạng thái form thành chỉnh sửa
      setUserInfo(data); // Lưu thông tin khách hàng vào state
      setFormState({
        userId: data?.data?.simplifiedcustomerDetail?.id,
        name: data?.data?.simplifiedcustomerDetail?.name,
        pm: data?.data?.simplifiedcustomerDetail?.pm,
        location: data?.data?.simplifiedcustomerDetail?.location,
        branch: data?.data?.simplifiedcustomerDetail?.branch,
        representative: data?.data?.simplifiedcustomerDetail?.representative,
        status: data?.data?.simplifiedcustomerDetail?.status,
        phoneNumber: data?.data?.simplifiedcustomerDetail?.phoneNumber,
        note: data?.data?.simplifiedcustomerDetail?.note
      });
    }
  });

  // Hàm gọi API lấy thông tin chi tiết khách hàng
  const handlegetInfoCustomer = (rowId) => {
    getCustomerMutation.mutate(rowId); // Gọi mutation lấy thông tin khách hàng
  };

  // Hàm xử lý khi cần cập nhật khách hàng
  const handleUpdateCustomer = (rowId) => {
    getCustomerMutation.mutate(rowId); // Lấy thông tin khách hàng
    handleOpenDialog('dialog1'); // Mở dialog cập nhật
  };

  // Mutation để cập nhật khách hàng
  const updateCustomer = useMutation({
    mutationFn: ({ customerId, values }) => {
      if (!customerId) {
        throw new Error('Không timg thấy dự án'); // Nếu không tìm thấy ID khách hàng
      }
      return customerApi.updateCustomer(Number(customerId), values); // Gọi API cập nhật
    },
    onSuccess: (customer) => {
      console.log(customer);
      alert('Cập nhật dự án thành công'); // Thông báo thành công
      refetch(); // Lấy lại danh sách khách hàng mới
    }
  });

  return (
    <>
      <MainCard title="Quản lý Dự án">
        {/* Nút thêm dự án */}
        <Button sx={{ mb: 2 }} onClick={() => handleOpenDialog('dialog1')} variant="outlined" startIcon={<AddIcon />}>
          Thêm dự án
        </Button>

        {/* Dialog cho form thêm/chỉnh sửa dự án */}
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
          {/* Thanh công cụ trong Dialog */}
          <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="close" onClick={handleCloseDialog}>
                <CloseIcon color="primary" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            {/* Form khách hàng */}
            <CustomerForm
              updateCustomer={updateCustomer}
              addCustomer={addCustomer}
              formState={formState}
              handleCloseDialog={handleCloseDialog}
              isEdit={isEdit}
            />
          </DialogContent>
        </Dialog>

        {/* Dialog hiển thị thông tin khách hàng */}
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
          {/* Thanh công cụ trong Dialog */}
          <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="close" onClick={() => handleCloseDialog('dialog2')}>
                <CloseIcon color="primary" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>{isEdit && <InfoCustomer handleDeleteCustomer={handleDeleteCustomer} userInfo={userInfo} />}</DialogContent>
        </Dialog>

        {/* Bảng dữ liệu dự án */}
        <Box sx={{ width: '100%', height: '600px' }}>
          <DataTable columns={columns} data={customerData} />
        </Box>
      </MainCard>
    </>
  );
}

export default Customer;
