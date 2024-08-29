/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, IconButton, Drawer } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function DispatchWarehouse({ disPatchData }) {
  const [open, setOpen] = useState(false); // state quản lý drawer
  const [WCPDetail, setWCPdetail] = useState(null); // state quản lý dữ liệu warehose dispatch
  console.log(disPatchData);
  // Cài đặt cột cho data grid warehouse dispatch
  const dispatchCols = [
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
              toggleDrawer(true)();
              getDcpDetails(id);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const dispatchDetail = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'tên sản phẩm', width: 250 },
    { field: 'quantity', headerName: 'Số lượng', width: 250 }
  ];

  // trả về giao diện warehouse dispatch details
  const DrawerList = (
    <Box sx={{ width: 550, zIndex: 12000 }}>
      <DataGrid columns={dispatchDetail} rows={WCPDetail && WCPDetail} checkboxSelection />
    </Box>
  );

  // hàm xử lý cài dặt drawer
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // hàm lấy dữ liệu warehouse dispatch đã click
  function findMatchingDispatchById(warehouseDispatches, id) {
    for (const dispatch of warehouseDispatches) {
      if (dispatch.id === id) {
        return dispatch.warehouseDispatchDetails; // trả về chi tiết xuất kho
      }
    }
    return null; // ko trùng trả về null
  }

  const getDcpDetails = (id) => {
    const matchingDispatch = findMatchingDispatchById(disPatchData, id); // function
    setWCPdetail(matchingDispatch);
  };

  return (
    <>
      <DataGrid
        rowHeight={70}
        rows={disPatchData}
        columns={dispatchCols}
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

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default DispatchWarehouse;
