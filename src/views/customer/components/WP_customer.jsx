/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid'; // Component bảng dữ liệu từ MUI
import { Box, Typography, Grid, Divider } from '@mui/material'; // Các component giao diện từ MUI

// Component InfoSection để hiển thị các thông tin dưới dạng nhãn và giá trị
const InfoSection = ({ title, content }) => (
  <Box sx={{ '& .MuiTypography-body1': { mb: 1, lineHeight: 1.6 } }}>
    {' '}
    {/* Thiết lập CSS cho Typography */}
    <Typography variant="h4" sx={{ mb: 2 }}>
      {title} {/* Tiêu đề cho phần thông tin */}
    </Typography>
    {content.map((item, index) => (
      <Typography variant="body1" key={index}>
        <b>{item.label}:</b>&nbsp;&nbsp;{item.value} {/* Hiển thị nhãn và giá trị */}
      </Typography>
    ))}
  </Box>
);

// Component WPcustomer để hiển thị chi tiết warehouse dispatch
function WPcustomer({ WCPDetail, userInfoFormat }) {
  // Cấu hình cột cho bảng dữ liệu sản phẩm trong warehouse dispatch
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 }, // Cột ID sản phẩm
    { field: 'productName', headerName: 'Tên sản phẩm', width: 450 }, // Cột tên sản phẩm
    { field: 'quantity', headerName: 'Số lượng', width: 100 } // Cột số lượng sản phẩm
  ];

  return (
    <Box sx={{ width: 1000, p: 3 }}>
      {/* Header hiển thị mã phiếu và thời gian tạo phiếu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant="h4">Mã phiếu: {WCPDetail.exportCode}</Typography> {/* Hiển thị mã phiếu */}
        <Typography variant="h6">Thời gian tạo: {WCPDetail.exportDate}</Typography> {/* Hiển thị thời gian tạo */}
      </Box>
      <Divider sx={{ mt: 4, mb: 4 }} /> {/* Đường ngăn cách giữa các phần nội dung */}
      {/* Hiển thị các thông tin đơn hàng và trạng thái đơn xuất */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InfoSection
            title="Thông tin đơn"
            content={[
              { label: 'Tổng số lượng sản phẩm', value: WCPDetail.totalProductQuantity }, // Tổng số lượng sản phẩm
              { label: 'Giá trị đơn', value: WCPDetail.totalAmount } // Giá trị của đơn hàng
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoSection
            title="Trạng thái đơn xuất"
            content={[
              { label: 'Kiểu xuất', value: WCPDetail.exportType }, // Kiểu xuất kho
              { label: 'Trạng thái', value: 'Đã nhận' } // Trạng thái đơn xuất
            ]}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 4, mb: 4 }} />
      {/* Hiển thị thông tin về địa chỉ nhận hàng và dự án nhận hàng */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InfoSection
            title="Địa chỉ nhận hàng"
            content={[
              { label: 'Địa chỉ', value: userInfoFormat.location }, // Địa chỉ nhận hàng
              { label: 'Số điện thoại', value: userInfoFormat.phoneNumber } // Số điện thoại nhận hàng
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoSection
            title="Thông tin dự án nhận hàng"
            content={[
              { label: 'Tên dự án', value: userInfoFormat.name }, // Tên dự án
              { label: 'Địa chỉ', value: userInfoFormat.location }, // Địa chỉ dự án
              { label: 'PM', value: userInfoFormat.pm }, // Quản lý dự án
              { label: 'Người nhận', value: userInfoFormat.representative }, // Người đại diện nhận hàng
              { label: 'Số điện thoại người nhận', value: userInfoFormat.phoneNumber } // Số điện thoại người nhận
            ]}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 4, mb: 4 }} />
      {/* Bảng hiển thị chi tiết sản phẩm trong warehouse dispatch */}
      <Box>
        <DataGrid
          rowHeight={70} /* Chiều cao của mỗi hàng trong bảng */
          rows={WCPDetail?.warehouseDispatchDetails || []} /* Dữ liệu sản phẩm trong warehouse dispatch */
          columns={columns} /* Cấu hình cột của bảng */
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } } // Phân trang mặc định là 5 dòng mỗi trang
          }}
          pagination // Kích hoạt tính năng phân trang
          checkboxSelection // Kích hoạt tính năng chọn nhiều hàng
          pageSizeOptions={[5, 10, 25]} /* Các tùy chọn kích thước trang */
        />
      </Box>
    </Box>
  );
}

export default WPcustomer;
