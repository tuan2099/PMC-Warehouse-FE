import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
function Userdispatch({ dataWarehouseDispatch }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'exportDetails', headerName: 'Tên', width: 350 },
    { field: 'totalAmount', headerName: 'Tổng tiền', width: 250 },
    { field: 'totalQuantityExported', headerName: 'Tổng số lượng xuất', width: 200 }
    // { field: 'role', headerName: 'Quyền hạn', width: 110 }
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
