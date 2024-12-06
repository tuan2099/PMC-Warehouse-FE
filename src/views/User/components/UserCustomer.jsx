/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Box } from '@mui/material';
import DataTable from 'ui-component/DataTable';

function UserCustomer(dataCustomer) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'customer_name', headerName: 'Tên', width: 350 },
    { field: 'customer_position', headerName: 'PM', width: 350 },
    { field: 'customer_address', headerName: 'Địa chỉ', width: 350 },
    { field: 'customer_phone', headerName: 'Điện thoại', width: 350 },
    { field: 'representative', headerName: 'Người đại diện', width: 350 }
  ];

  return (
    <>
      <Box>
        <DataTable rows={dataCustomer?.dataCustomer} columns={columns} />
      </Box>
    </>
  );
}

export default UserCustomer;
