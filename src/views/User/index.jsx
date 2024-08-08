import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { getAllUser } from 'api/auth.api';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'userId', headerName: 'First name', width: 150 },
  { field: 'title', headerName: 'Last name', width: 150 },
  { field: 'completed', headerName: 'Age', width: 110 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: (params) => (
      <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}>
        Delete
      </Button>
    )
  }
];

const fetchTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
function User() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['todos'], // Đặt queryKey trong một mảng
    queryFn: fetchTodos // queryFn là hàm lấy dữ liệu
  });
  // const { data } = useQuery({
  //   queryKey: 'users',
  //   queryFn: () => {
  //     return getAllUser;
  //   }
  // });
  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </div>
  );
}

export default User;
