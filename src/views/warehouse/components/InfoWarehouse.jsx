/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// MUI Components
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';

// Custom Components
import InventoryWarehouse from './InventoryWarehouse'; // Component hiển thị thông tin sản phẩm tồn kho
import DispatchWarehouse from './DispatchWarehouse'; // Component hiển thị thông tin đơn đã xuất kho

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>} {/* Hiển thị nội dung của tab nếu tab được chọn */}
    </div>
  );
}

// Component hiển thị thông tin của warehouse (kho hàng)
function InfoWarehouse({ warehouseId }) {
  const [value, setValue] = useState(0); // State để quản lý tab hiện tại

  // Hàm xử lý khi thay đổi tab
  const handleChange = (event, newValue) => {
    setValue(newValue); // Cập nhật tab đang được chọn
  };

  // Hàm trả về các thuộc tính cần thiết cho từng tab (a11y - Accessibility)
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`, // ID của tab
      'aria-controls': `simple-tabpanel-${index}` // Liên kết với panel của tab tương ứng
    };
  }

  console.log(warehouseId); // Kiểm tra dữ liệu warehouseId qua console

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {/* Tabs để chuyển đổi giữa các phần thông tin của kho */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin kho" {...a11yProps(0)} /> {/* Tab hiển thị thông tin chung của kho */}
            <Tab label="Số lượng đơn đã xuất" {...a11yProps(1)} /> {/* Tab hiển thị số lượng đơn đã xuất */}
            <Tab label="Số lượng đơn đã nhập" {...a11yProps(2)} /> {/* Tab hiển thị số lượng đơn đã nhập */}
            <Tab label="Số đơn đã chuyển" {...a11yProps(3)} /> {/* Tab hiển thị số đơn đã chuyển */}
            <Tab label="Số lượng sản phẩm tồn trong kho" {...a11yProps(4)} /> {/* Tab hiển thị số lượng sản phẩm tồn kho */}
          </Tabs>
        </Box>

        {/* Panel hiển thị thông tin chung của kho */}
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Tên kho</Typography> {/* Hiển thị tên kho */}
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{warehouseId?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Địa chỉ kho</Typography> {/* Hiển thị địa chỉ kho */}
              <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{warehouseId?.address}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* Panel hiển thị số lượng đơn đã xuất */}
        <CustomTabPanel value={value} index={1}>
          {/* Component DispatchWarehouse hiển thị danh sách đơn đã xuất */}
          <DispatchWarehouse disPatchData={warehouseId && warehouseId.warehouse_dispatches} />
        </CustomTabPanel>

        {/* Panel cho số lượng đơn đã nhập (Hiện chưa có nội dung) */}
        <CustomTabPanel value={value} index={2}></CustomTabPanel>

        {/* Panel cho số đơn đã chuyển (Hiện chưa có nội dung) */}
        <CustomTabPanel value={value} index={3}></CustomTabPanel>

        {/* Panel hiển thị số lượng sản phẩm tồn kho */}
        <CustomTabPanel value={value} index={4}>
          {/* Component InventoryWarehouse hiển thị thông tin tồn kho */}
          <InventoryWarehouse inventoryWarehouse={warehouseId && warehouseId.warehouse_inventories} />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default InfoWarehouse;
