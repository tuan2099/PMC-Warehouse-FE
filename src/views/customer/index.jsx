/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
// Các thành phần MUI
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
      setFormState(INITIAL_STATE);
    } else if (dialogId === 'dialog2') {
      // Đặt lại giá trị form nếu là dialog2
      setFormState({
        name: ''
      });
    }
  };

  const authUser = JSON.parse(localStorage.getItem('auth_user'));

  const { data: customerData, refetch } = useQuery({
    queryKey: ['customer', page, authUser.id, authUser.role], // Thêm id và role vào queryKey
    queryFn: async () => {
      // Gọi API với id và role được truyền vào
      const response = await customerApi.getAllCustomer(page, authUser.id, authUser.role);
      return response; // Trả về kết quả từ API
    },
    onSuccess: (data) => {
      // Kiểm tra xem trang hiện tại có vượt quá tổng số trang không, nếu có thì điều chỉnh lại
      if (page && +page > data.data.meta.totalPages) {
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          page: data.data.meta.totalPages.toString()
        });
      }
    },
    keepPreviousData: true // Giữ dữ liệu cũ trước khi có dữ liệu mới
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
    onSuccess: () => {
      alert('Cập nhật dự án thành công'); // Thông báo thành công
      refetch(); // Lấy lại danh sách khách hàng mới
    }
  });

  return (
    <>
      <MainCard title="Quản lý Dự án">
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
          {isEdit && <InfoCustomer handleDeleteCustomer={handleDeleteCustomer} userInfo={userInfo} />}
        </ViewDetailDialog>

        {/* Bảng dữ liệu dự án */}
        <Box sx={{ width: '100%', height: '600px' }}>
          <DataTable columns={columns} rows={customerData?.data?.data} />
        </Box>
      </MainCard>
    </>
  );
}

export default Customer;
