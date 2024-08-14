/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function UserWarehouse({ dataWarehouse }) {
  const transformedDataCustomer = dataWarehouse.map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    warehouse: item.warehouse?.name
  }));
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'warehouse', headerName: 'Tên', width: 350 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 250 },
    { field: 'updatedAt', headerName: 'Ngày cập nhật gần nhất', width: 110 }
    // { field: 'role', headerName: 'Quyền hạn', width: 110 }
  ];
  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid rows={transformedDataCustomer} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </>
  );
}

export default UserWarehouse;
