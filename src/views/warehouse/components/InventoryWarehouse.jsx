/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { Box } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // Các component của MUI để tạo bảng dữ liệu
import React from 'react';

// Component InventoryWarehouse hiển thị thông tin tồn kho
function InventoryWarehouse({ inventoryWarehouse }) {
  // Cấu hình cột cho bảng dữ liệu tồn kho
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 }, // Cột ID sản phẩm
    { field: 'productName', headerName: 'Tên sản phẩm', width: 350 }, // Cột tên sản phẩm
    { field: 'quantity', headerName: 'Tồn kho', width: 150 } // Cột số lượng tồn kho
  ];

  return (
    <>
      {/* Hộp chứa DataGrid */}
      <Box sx={{ height: '100%', width: '100%' }}>
        {/* Bảng hiển thị thông tin tồn kho */}
        <DataGrid
          rows={inventoryWarehouse} /* Dữ liệu hàng tồn kho được truyền vào từ props */
          columns={columns} /* Cấu hình cột cho bảng */
          pageSize={5} /* Số lượng hàng hiển thị trên mỗi trang */
          checkboxSelection /* Cho phép chọn nhiều hàng */
          slots={{ toolbar: GridToolbar }} /* Thêm thanh công cụ cho bảng */
          slotProps={{
            toolbar: {
              showQuickFilter: true /* Hiển thị thanh lọc nhanh */
            }
          }}
        />
      </Box>
    </>
  );
}

export default InventoryWarehouse;
