import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';
import CustomTabPanel from 'ui-component/CustomTabPanel';
import { useQuery } from '@tanstack/react-query';
import orderApi from 'api/order.api';
import OrderSupllier from './OrderSupllier';

const SupplierDetail = ({ supplierId }) => {
  const [value, setValue] = useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  };

  const { data: OrderDataBySupplier } = useQuery({
    queryKey: ['orderSuppliers', supplierId?.id],
    queryFn: () => orderApi.getOrderBySupplier(supplierId?.id),
    enabled: !!supplierId?.id
  });

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin" {...a11yProps(0)} />
            <Tab label="Đơn nhập" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">ID</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{supplierId?.id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Tên</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{supplierId?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Địa chỉ</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{supplierId?.address}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Địa chỉ</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{supplierId?.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Số điện thoại</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{supplierId?.phoneNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Ngày tạo</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{supplierId?.createdAt}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <OrderSupllier orderData={OrderDataBySupplier?.data?.result} />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default SupplierDetail;
