import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';
import CustomTabPanel from 'ui-component/CustomTabPanel';

const TransferDetail = ({ data }) => {
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
            <Tab label="Thông tin" {...a11yProps(0)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">ID</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Tên</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Kho gốc</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.fromWarehouseID}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Kho đến</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.toWarehouseID}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Ghi chú</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.note}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Người tạo</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.userID}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Ngày tạo</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{data?.createdAt}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default TransferDetail;
