/* eslint-disable prettier/prettier */
import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function WPcustomer({ WCPDetail }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 250 },
    { field: 'quantity', headerName: 'Số lượng', width: 150 }
  ];
  return (
    <>
      <DataGrid
        rowHeight={70}
        rows={WCPDetail && WCPDetail}
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
    </>
  );
}

export default WPcustomer;
