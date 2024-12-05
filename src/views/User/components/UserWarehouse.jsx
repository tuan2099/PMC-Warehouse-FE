/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function UserWarehouse(dataWarehouse) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'warehouse_name', headerName: 'Tên', width: 350 },
    { field: 'warehouse_address', headerName: 'Địa chỉ', width: 350 }
  ];
  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid rows={dataWarehouse?.dataWarehouse} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </>
  );
}

export default UserWarehouse;
