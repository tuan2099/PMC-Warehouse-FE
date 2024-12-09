/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { Box } from '@mui/system';
import { GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import DataTable from 'ui-component/DataTable';

function InventoryWarehouse({ inventoryWarehouse }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 350 },
    { field: 'quantity', headerName: 'Tồn kho', width: 150 }
  ];

  return (
    <>
      <Box sx={{ height: '50vh%', width: '100%' }}>
        <DataTable
          rows={inventoryWarehouse}
          columns={columns}
        />
      </Box>
    </>
  );
}

export default InventoryWarehouse;
