import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import warehouseDispatchApi from 'api/warehouseDispatch';
import DispatchWarehouse from './DispatchWarehouse';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function InfoCustomer({ customerInfo }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const { data: DispatchByCustomerData } = useQuery({
    queryKey: ['customerDispatchDetail', customerInfo?.id],
    queryFn: () => warehouseDispatchApi.getDispatchByCustomer(customerInfo?.id),
    enabled: !!customerInfo?.id
  });

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin Dự án" {...a11yProps(0)} />
            <Tab label="Đơn xuất" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Giám đốc toà nhà</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{customerInfo.pm}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Địa chỉ</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{customerInfo.location}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Chi nhánh</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{customerInfo.branch}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Người đại diện</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{customerInfo.representative}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <DispatchWarehouse disPatchData={DispatchByCustomerData?.data?.result} />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default InfoCustomer;
