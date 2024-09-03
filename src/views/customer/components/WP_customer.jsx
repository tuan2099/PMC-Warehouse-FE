/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Grid, Divider } from '@mui/material';

const InfoSection = ({ title, content }) => (
  <Box sx={{ '& .MuiTypography-body1': { mb: 1, lineHeight: 1.6 } }}>
    <Typography variant="h4" sx={{ mb: 2 }}>
      {title}
    </Typography>
    {content.map((item, index) => (
      <Typography variant="body1" key={index}>
        <b>{item.label}:</b>&nbsp;&nbsp;{item.value}
      </Typography>
    ))}
  </Box>
);

function WPcustomer({ WCPDetail, userInfoFormat }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 450 },
    { field: 'quantity', headerName: 'Số lượng', width: 100 }
  ];

  return (
    <Box sx={{ width: 1000, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant="h4">Mã phiếu: {WCPDetail.exportCode}</Typography>
        <Typography variant="h6">Thời gian tạo: {WCPDetail.exportDate}</Typography>
      </Box>
      <Divider sx={{ mt: 4, mb: 4 }} />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InfoSection
            title="Thông tin đơn"
            content={[
              { label: 'Tổng số lượng sản phẩm', value: WCPDetail.totalProductQuantity },
              { label: 'Giá trị đơn', value: WCPDetail.totalAmount }
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoSection
            title="Trạng thái đơn xuất"
            content={[
              { label: 'Kiểu xuất', value: WCPDetail.exportType },
              { label: 'Trạng thái', value: 'Đã nhận' }
            ]}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InfoSection
            title="Địa chỉ nhận hàng"
            content={[
              { label: 'Địa chỉ', value: userInfoFormat.location },
              { label: 'Số điện thoại', value: userInfoFormat.phoneNumber }
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoSection
            title="Thông tin dự án nhận hàng"
            content={[
              { label: 'Tên dự án', value: userInfoFormat.name },
              { label: 'Địa chỉ', value: userInfoFormat.location },
              { label: 'PM', value: userInfoFormat.pm },
              { label: 'Người nhận', value: userInfoFormat.representative },
              { label: 'Số điện thoại người nhận', value: userInfoFormat.phoneNumber }
            ]}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Box>
        <DataGrid
          rowHeight={70}
          rows={WCPDetail?.warehouseDispatchDetails || []}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
          pagination
          checkboxSelection
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </Box>
  );
}

export default WPcustomer;
