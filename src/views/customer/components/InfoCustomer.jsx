/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// Các thành phần của MUI
import { Box, Tabs, Tab, Typography, Button, Grid, IconButton, Drawer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Icon xóa
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // Bảng dữ liệu từ MUI
import { Search as SearchIcon } from '@mui/icons-material'; // Icon tìm kiếm
import WPcustomer from './WP_customer'; // Component WP_customer để hiển thị chi tiết warehouse dispatch

// Hàm để quản lý và hiển thị nội dung theo từng tab của MUI
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>} {/* Chỉ hiển thị nội dung khi tab được chọn */}
    </div>
  );
}

// Component InfoCustomer để hiển thị thông tin chi tiết khách hàng
function InfoCustomer({ userInfo, handleDeleteCustomer }) {
  const [open, setOpen] = useState(false); // State để quản lý trạng thái mở/đóng của drawer
  const [WCPDetail, setWCPdetail] = useState(null); // State để quản lý dữ liệu chi tiết warehouse dispatch
  const [value, setValue] = useState(0); // State để quản lý giá trị của tab MUI (tab nào đang được chọn)

  // Hàm để bật/tắt drawer (bảng điều khiển chi tiết)
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Cấu hình các cột cho bảng dữ liệu warehouse dispatch
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'exportCode', headerName: 'Mã xuất kho', width: 250 },
    { field: 'exportDate', headerName: 'Ngày xuất', width: 250 },
    { field: 'exportType', headerName: 'Kiểu xuất', width: 150 },
    { field: 'totalProductQuantity', headerName: 'Tổng số lượng sản phẩm', width: 150 },
    { field: 'exportDescription', headerName: 'Mô tả', width: 150 },
    { field: 'recipient', headerName: 'Người nhận', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions', // Cột hành động
      width: 220,
      renderCell: ({ id }) => (
        <>
          {/* Icon để xem chi tiết warehouse dispatch */}
          <IconButton
            onClick={() => {
              checkWarehosue(id); // Lấy chi tiết warehouse dispatch theo ID
              toggleDrawer(true)(); // Mở drawer để hiển thị chi tiết
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  // Hàm điều khiển chuyển đổi giữa các tab của MUI
  const handleChange = (event, newValue) => {
    setValue(newValue); // Cập nhật tab hiện tại
  };

  // Hàm trả về các thuộc tính cần thiết cho các tab của MUI
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  // Định dạng dữ liệu khách hàng từ API để dễ sử dụng
  const userInfoFormat = userInfo?.data?.simplifiedcustomerDetail;

  // Hàm kiểm tra và lấy warehouse dispatch dựa trên ID đã chọn
  const checkWarehosue = (id) => {
    const warehouseDispatchDetails = userInfo?.data?.simplifiedcustomerDetail?.warehouse_dispatches;
    warehouseDispatchDetails.map((dispatch) => {
      if (dispatch.id === id) {
        setWCPdetail(dispatch); // Cập nhật chi tiết warehouse dispatch
      }
    });
  };

  return (
    <>
      {/* Hộp chứa toàn bộ nội dung */}
      <Box sx={{ width: '100%' }}>
        {/* Thông tin tiêu đề và nút xóa */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h1" gutterBottom>
            {userInfoFormat.name} {/* Tên khách hàng/dự án */}
          </Typography>
          <Button onClick={() => handleDeleteCustomer(userInfoFormat.id)} startIcon={<DeleteIcon />}>
            Xoá dự án {/* Nút xóa dự án */}
          </Button>
        </Box>

        {/* Tabs để chuyển đổi giữa các phần */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin Dự án" {...a11yProps(0)} /> {/* Tab thông tin dự án */}
            <Tab label="Thông tin xuất đơn" {...a11yProps(1)} /> {/* Tab thông tin warehouse dispatch */}
          </Tabs>
        </Box>

        {/* Nội dung của tab Thông tin dự án */}
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Giám đốc toà nhà</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{userInfoFormat.pm}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Địa chỉ</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{userInfoFormat.location}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Chi nhánh</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{userInfoFormat.branch}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Người đại diện</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{userInfoFormat.representative}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* Nội dung của tab Thông tin xuất đơn */}
        <CustomTabPanel value={value} index={1}>
          <DataGrid
            rowHeight={70} /* Chiều cao của mỗi hàng trong bảng */
            rows={userInfoFormat?.warehouse_dispatches || []} /* Dữ liệu warehouse dispatch */
            columns={columns} /* Cấu hình cột */
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } } // Phân trang với kích thước mặc định là 5
            }}
            pagination
            checkboxSelection
            slots={{ toolbar: GridToolbar }} /* Thanh công cụ cho bảng dữ liệu */
            slotProps={{
              toolbar: {
                showQuickFilter: true // Hiển thị bộ lọc nhanh
              }
            }}
            pageSizeOptions={[5, 10, 25]} /* Các lựa chọn cho kích thước trang */
          />
        </CustomTabPanel>
      </Box>

      {/* Drawer hiển thị chi tiết warehouse dispatch */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <WPcustomer WCPDetail={WCPDetail} userInfoFormat={userInfoFormat} /> {/* Truyền dữ liệu chi tiết vào WPcustomer */}
      </Drawer>
    </>
  );
}

export default InfoCustomer;
