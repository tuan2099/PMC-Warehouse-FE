import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Button, Grid, IconButton, Drawer } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import warehouseDispatchApi from 'api/warehouseDispatch';

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
  console.log(customerInfo?.data?.simplifiedcustomerDetail?.id);
  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 100 },
  //   { field: 'exportCode', headerName: 'Mã xuất kho', width: 250 },
  //   { field: 'exportDate', headerName: 'Ngày xuất', width: 250 },
  //   { field: 'exportType', headerName: 'Kiểu xuất', width: 150 },
  //   { field: 'totalProductQuantity', headerName: 'Tổng số lượng sản phẩm', width: 150 },
  //   { field: 'exportDescription', headerName: 'Mô tả', width: 150 },
  //   { field: 'recipient', headerName: 'Người nhận', width: 150 },
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     width: 220,
  //     renderCell: ({ id }) => (
  //       <>
  //         <IconButton
  //           onClick={() => {
  //             checkWarehosue(id);
  //             toggleDrawer(true)();
  //           }}
  //         >
  //           <SearchIcon />
  //         </IconButton>
  //       </>
  //     )
  //   }
  // ];

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
    queryKey: ['customerDispatch', customerInfo?.data?.simplifiedcustomerDetail?.id],
    queryFn: () => warehouseDispatchApi.getDispatchByCustomer(customerInfo?.data?.simplifiedcustomerDetail?.id),
    enabled: !!customerInfo?.data?.simplifiedcustomerDetail?.id
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
          {/* <Grid container spacing={2}>
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
          </Grid> */}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {/* <WPcustomer disPatchData={userInfoFormat} /> */}
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default InfoCustomer;
