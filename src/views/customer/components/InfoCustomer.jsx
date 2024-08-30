/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// MUI components
import { Box, Tabs, Tab, Typography, Button, Grid, IconButton, Drawer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Search as SearchIcon } from '@mui/icons-material';
import WPcustomer from './WP_customer';

// hàm xử lý tab Mui
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function InfoCustomer({ userInfo, handleDeleteCustomer }) {
  const [open, setOpen] = useState(false); // state quản lý drawer
  const [WCPDetail, setWCPdetail] = useState(null); // state quản lý dữ liệu warehose dispatch
  const [value, setValue] = useState(0); // state quản lý tab Mui

  // hàm xử lý cài dặt drawer
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Cài đặt cột cho data grid warehouse dispatch
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'exportCode', headerName: 'Mã xuất kho', width: 250 },
    { field: 'exportDate', headerName: 'Ngày xuất', width: 250 },
    { field: 'exportType', headerName: 'Kiểu xuất', width: 150 },
    { field: 'totalProductQuantity', headerName: 'Tổng số lượng sản phẩm', width: 150 },
    { field: 'exportDescription', headerName: 'Mô tả', width: 150 },
    { field: 'recipient', headerName: 'Người nhận', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton
            onClick={() => {
              checkWarehosue(id);
              toggleDrawer(true)();
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  // hàm điều khiển tab Mui
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // hàm điều khiển tab Mui
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }
  // Xử lý dữ liệu lấy từ api về
  const userInfoFormat = userInfo?.data?.simplifiedcustomerDetail;

  // kiểm tra và trả về warehouse dispatch đã click
  const checkWarehosue = (id) => {
    const warehouseDispatchDetails = userInfo?.data?.simplifiedcustomerDetail?.warehouse_dispatches;
    warehouseDispatchDetails.map((dispatch) => {
      if (dispatch.id === id) {
        const result = dispatch.warehouseDispatchDetails;
        setWCPdetail(result);
      }
    });
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h1" gutterBottom>
            {userInfoFormat.name}
          </Typography>
          <Button onClick={() => handleDeleteCustomer(userInfoFormat.id)} startIcon={<DeleteIcon />}>
            Xoá dự án
          </Button>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin Dự án" {...a11yProps(0)} />
            <Tab label="Thông tin xuất đơn" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Giám đôc toà nhà</Typography>
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
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DataGrid
            rowHeight={70}
            rows={userInfoFormat?.warehouse_dispatches || []}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            pagination
            checkboxSelection
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true
              }
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </CustomTabPanel>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <WPcustomer WCPDetail={WCPDetail} />
      </Drawer>
    </>
  );
}

export default InfoCustomer;
