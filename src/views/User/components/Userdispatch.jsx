/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
function Userdispatch({ dataWarehouseDispatch }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'exportCode', headerName: 'Mã đơn', width: 150 },
    { field: 'totalAmount', headerName: 'Tổng tiền', width: 250 },
    { field: 'exportDate', headerName: 'Ngày xuất', width: 200 },
    { field: 'exportDescription', headerName: 'Nội dung xuất', width: 110 },
    { field: 'recipient', headerName: 'Người nhận', width: 110 },
    { field: 'totalProductQuantity', headerName: 'Tổng số lượng sản phẩm', width: 110 }
  ];
  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid rows={dataWarehouseDispatch} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </>
  );
}

export default Userdispatch;
