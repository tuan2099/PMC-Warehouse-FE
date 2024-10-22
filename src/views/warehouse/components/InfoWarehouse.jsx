/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// MUI Components
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';

// Custom Components
import InventoryWarehouse from './InventoryWarehouse';
import DispatchWarehouse from './DispatchWarehouse';

// Hàm quản lý hiển thị nội dung của các tab trong MUI
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel" // Định nghĩa vai trò là một bảng điều khiển tab
      hidden={value !== index} // Ẩn nội dung nếu tab không được chọn
      id={`simple-tabpanel-${index}`} // ID cho từng tab panel
      aria-labelledby={`simple-tab-${index}`} // Liên kết với tab tương ứng
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function InfoWarehouse({ warehouseId }) {
  const [value, setValue] = useState(0); // State để quản lý tab hiện tại

  const handleChange = (event, newValue) => {
    setValue(newValue); // Cập nhật tab đang được chọn
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`, // ID của tab
      'aria-controls': `simple-tabpanel-${index}` // Liên kết với panel của tab tương ứng
    };
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin kho" {...a11yProps(0)} />
            <Tab label="Số lượng đơn đã xuất" {...a11yProps(1)} />
            <Tab label="Số lượng đơn đã nhập" {...a11yProps(2)} />
            <Tab label="Số đơn đã chuyển" {...a11yProps(3)} />
            <Tab label="Số lượng sản phẩm tồn trong kho" {...a11yProps(4)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Tên kho</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{warehouseId?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Địa chỉ kho</Typography>
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{warehouseId?.address}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <DispatchWarehouse disPatchData={warehouseId && warehouseId.warehouse_dispatches} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}></CustomTabPanel>

        <CustomTabPanel value={value} index={3}></CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          <InventoryWarehouse inventoryWarehouse={warehouseId && warehouseId.warehouse_inventories} />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default InfoWarehouse;
