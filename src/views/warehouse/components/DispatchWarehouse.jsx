/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, IconButton, Drawer } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DataTable from 'ui-component/DataTable';

function DispatchWarehouse({ disPatchData }) {
  const [open, setOpen] = useState(false);
  const [WCPDetail, setWCPdetail] = useState(null);
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
      headerName: '',
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
    { field: 'productName', headerName: 'Tên sản phẩm', width: 250 },
    { field: 'quantity', headerName: 'Số lượng', width: 250 }
  ];

  const DrawerList = (
    <Box sx={{ width: 550, zIndex: 12000 }}>
      <DataGrid columns={dispatchDetail} rows={WCPDetail && WCPDetail} checkboxSelection />
    </Box>
  );

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function findMatchingDispatchById(warehouseDispatches, id) {
    for (const dispatch of warehouseDispatches) {
      if (dispatch.id === id) {
        return dispatch.warehouseDispatchDetails;
      }
    }
    return null;
  }

  const getDcpDetails = (id) => {
    const matchingDispatch = findMatchingDispatchById(disPatchData, id);
    setWCPdetail(matchingDispatch);
  };

  return (
    <>
      <DataTable
        rowHeight={70}
        rows={disPatchData}
        columns={dispatchCols}
        
      />

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default DispatchWarehouse;
