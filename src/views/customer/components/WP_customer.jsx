import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import DataTable from 'ui-component/DataTable';

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

function WPcustomer({ WCPDetail, userInfoFormat, columns }) {
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
        <DataTable rowHeight={70} rows={WCPDetail?.warehouseDispatchDetails || []} columns={columns} />
      </Box>
    </Box>
  );
}

export default WPcustomer;
