/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function InfoUser() {
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
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
            <Tab label="Khách đang quản lý" {...a11yProps(1)} />
            <Tab label="Đơn hàng đã xuất" {...a11yProps(2)} />
            <Tab label="Đơn hàng đã nhập" {...a11yProps(3)} />
            <Tab label="Đơn đã chuyển" {...a11yProps(4)} />
            <Tab label="Kho đang quản lý" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Thông tin cá nhân
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Khách đang quản lý
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Đơn hàng đã xuất
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Đơn hàng đã nhập
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Đơn đã chuyển
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          Kho đang quản lý
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default InfoUser;
