/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Grid, Divider } from '@mui/material';

function WPcustomer({ WCPDetail, userInfoFormat }) {
  console.log(userInfoFormat);
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 450 },
    { field: 'quantity', headerName: 'Số lượng', width: 100 }
  ];
  return (
    <>
      <Box sx={{ width: 1000, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'bottom' }}>
          <Typography variant="h4">Mã phiếu: {WCPDetail.exportCode} </Typography>
          <Typography variant="h6">Thời gian tạo: {WCPDetail.exportDate}</Typography>
        </Box>
        <Divider sx={{ mt: 4, mb: 4 }} />
        <Grid container>
          <Grid item xs={4}>
            <Box sx={{ '& .MuiTypography-body1': { mb: 1, lineHeight: 1.6 } }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Thông tin đơn
              </Typography>
              <Typography variant="body1">
                <b>Tổng số lượng sản phẩm:</b>&nbsp;&nbsp; {WCPDetail.totalProductQuantity}
              </Typography>
              <Typography variant="body1">
                <b>Giá trị đơn:</b>&nbsp;&nbsp; {WCPDetail.totalAmount}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ '& .MuiTypography-body1': { mb: 1, lineHeight: 1.6 } }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Trạng thái đơn xuất
              </Typography>
              <Typography variant="body1">
                <b>Kiểu xuất:</b>&nbsp;&nbsp; {WCPDetail.exportType}
              </Typography>
              <Typography variant="body1">
                <b>Trạng thái:</b>&nbsp;&nbsp; Đã nhận
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4, mb: 4 }} />
        <Grid container>
          <Grid item xs={4}>
            <Box sx={{ '& .MuiTypography-body1': { mb: 1, lineHeight: 1.6 } }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Địa chỉ nhận hàng
              </Typography>
              <Typography variant="body1">
                <b>Địa chỉ:</b>&nbsp;&nbsp; {userInfoFormat.location}
              </Typography>
              <Typography variant="body1">
                <b>Số điện thoại:</b>&nbsp;&nbsp; {userInfoFormat.phoneNumber}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ '& .MuiTypography-body1': { mb: 1, lineHeight: 1.6 } }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Thông tin dự án nhận hàng
              </Typography>
              <Typography variant="body1">
                <b>Tên dự án:</b>&nbsp;&nbsp; {userInfoFormat.name}
              </Typography>
              <Typography variant="body1">
                <b>Địa chỉ:</b>&nbsp;&nbsp;{userInfoFormat.location}
              </Typography>
              <Typography variant="body1">
                <b>PM:</b>&nbsp;&nbsp;{userInfoFormat.pm}
              </Typography>
              <Typography variant="body1">
                <b>Người nhận:</b>&nbsp;&nbsp;{userInfoFormat.representative}
              </Typography>
              <Typography variant="body1">
                <b>Số điện thoại người nhận:</b>&nbsp;&nbsp;{userInfoFormat.phoneNumber}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4, mb: 4 }} />

        <Box>
          <DataGrid
            rowHeight={70}
            rows={WCPDetail && WCPDetail.warehouseDispatchDetails}
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
    </>
  );
}

export default WPcustomer;
