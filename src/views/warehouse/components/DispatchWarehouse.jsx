/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, IconButton, Drawer } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function DispatchWarehouse({ disPatchData }) {
  const [open, setOpen] = useState(false); // State quản lý trạng thái mở/đóng của drawer
  const [WCPDetail, setWCPdetail] = useState(null); // State quản lý chi tiết warehouse dispatch
  console.log(disPatchData); // In dữ liệu disPatchData ra console để kiểm tra

  // Cấu hình cột cho bảng dữ liệu warehouse dispatch
  const dispatchCols = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'exportCode', headerName: 'Mã xuất kho', width: 250 },
    { field: 'exportDate', headerName: 'Ngày xuất', width: 250 },
    { field: 'exportType', headerName: 'Kiểu xuất', width: 150 },
    { field: 'totalProductQuantity', headerName: 'Tổng số lượng sản phẩm', width: 150 },
    { field: 'exportDescription', headerName: 'Mô tả', width: 150 },
    { field: 'recipient', headerName: 'Người nhận', width: 150 },
    {
      field: 'actions', // Cột chứa các hành động (xem chi tiết)
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          {/* Nút để mở drawer và hiển thị chi tiết xuất kho */}
          <IconButton
            onClick={() => {
              toggleDrawer(true)(); // Mở drawer
              getDcpDetails(id); // Lấy chi tiết warehouse dispatch theo ID
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  // Cấu hình cột cho bảng chi tiết warehouse dispatch
  const dispatchDetail = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 250 },
    { field: 'quantity', headerName: 'Số lượng', width: 250 }
  ];

  // Giao diện hiển thị chi tiết warehouse dispatch trong drawer
  const DrawerList = (
    <Box sx={{ width: 550, zIndex: 12000 }}>
      {/* Bảng hiển thị chi tiết sản phẩm trong warehouse dispatch */}
      <DataGrid columns={dispatchDetail} rows={WCPDetail && WCPDetail} checkboxSelection />
    </Box>
  );

  // Hàm bật/tắt drawer
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen); // Đặt trạng thái mở/đóng của drawer
  };

  // Hàm tìm chi tiết warehouse dispatch theo ID
  function findMatchingDispatchById(warehouseDispatches, id) {
    for (const dispatch of warehouseDispatches) {
      if (dispatch.id === id) {
        return dispatch.warehouseDispatchDetails; // Trả về chi tiết xuất kho nếu tìm thấy
      }
    }
    return null; // Nếu không tìm thấy thì trả về null
  }

  // Hàm lấy chi tiết warehouse dispatch theo ID
  const getDcpDetails = (id) => {
    const matchingDispatch = findMatchingDispatchById(disPatchData, id); // Gọi hàm tìm kiếm
    setWCPdetail(matchingDispatch); // Cập nhật chi tiết vào state
  };

  return (
    <>
      {/* Bảng dữ liệu warehouse dispatch */}
      <DataGrid
        rowHeight={70} /* Chiều cao của mỗi hàng */
        rows={disPatchData} /* Dữ liệu được truyền vào từ props */
        columns={dispatchCols} /* Cấu hình cột */
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } } // Cấu hình phân trang mặc định với 5 dòng mỗi trang
        }}
        pagination // Kích hoạt tính năng phân trang
        checkboxSelection // Cho phép chọn nhiều hàng
        slots={{ toolbar: GridToolbar }} /* Thêm thanh công cụ với các tính năng như lọc nhanh */
        slotProps={{
          toolbar: {
            showQuickFilter: true // Hiển thị bộ lọc nhanh
          }
        }}
        pageSizeOptions={[5, 10, 25]} /* Các tùy chọn kích thước trang */
      />

      {/* Drawer hiển thị chi tiết warehouse dispatch */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList} {/* Hiển thị nội dung drawer */}
      </Drawer>
    </>
  );
}

export default DispatchWarehouse;
