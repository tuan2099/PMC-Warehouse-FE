/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';
import CustomTabPanel from 'ui-component/CustomTabPanel';

const WarehouseDetail = ({ data }) => {
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

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin xuất kho" {...a11yProps(0)} />
            <Tab label="Người tạo" {...a11yProps(1)} />
            <Tab label="Kho hàng" {...a11yProps(2)} />
            <Tab label="Khách hàng" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">CODE</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.exportCode}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Ngày xuất</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.exportDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Phân loại</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.exportType}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">CODE</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.totalProductQuantity}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Tổng số sản phẩm</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.exportCode}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Tổng số tiền</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.totalAmount}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Mô tả</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.exportDescription}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Tên người tạo</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.user?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Email</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.user?.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Ngày sinh</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.user?.date_of_birth}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Tên kho hàng</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.warehouse?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Địa chỉ</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.warehouse?.address}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Ngày tạo</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.warehouse?.createdAt}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Tên khách hàng</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.customer?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Địa chỉ</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.customer?.location}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Chi nhánh</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.customer?.branch}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Số điện thoại</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.customer?.phoneNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Trạng thái</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.customer?.status}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default WarehouseDetail;
