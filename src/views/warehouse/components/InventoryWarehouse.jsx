/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { Box } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';

function InventoryWarehouse({ inventoryWarehouse }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 350 },
    { field: 'quantity', headerName: 'Tồn kho', width: 150 }
  ];

  return (
    <>
      <Box sx={{ height: '50vh%', width: '100%' }}>
        <DataGrid
          rows={inventoryWarehouse}
          columns={columns}
          pageSize={5}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
        />
      </Box>
    </>
  );
}

export default InventoryWarehouse;
