import React, { useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

function InputTable() {
  // State để quản lý 10 ô input bên ngoài bảng
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
    input7: '',
    input8: '',
    input9: '',
    input10: ''
  });

  // State để quản lý các ô input trong bảng
  const [tableData, setTableData] = useState([
    { id: 1, name: '', age: '', email: '' },
    { id: 2, name: '', age: '', email: '' },
    { id: 3, name: '', age: '', email: '' }
  ]);

  // Hàm xử lý thay đổi giá trị của các ô input bên ngoài bảng
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  // Hàm xử lý thay đổi giá trị của các ô input trong bảng
  const handleTableInputChange = (e, rowId) => {
    const { name, value } = e.target;
    setTableData((prevData) => prevData.map((row) => (row.id === rowId ? { ...row, [name]: value } : row)));
  };

  // Hàm để lấy tất cả dữ liệu từ các ô input
  const handleSubmit = () => {
    console.log('Inputs:', inputs);
    console.log('Table Data:', tableData);
    // Xử lý thêm hoặc gửi dữ liệu tới server tại đây
  };

  return (
    <div>
      <h3>10 Inputs</h3>
      <div>
        {Object.keys(inputs).map((key, index) => (
          <TextField
            key={index}
            label={`Input ${index + 1}`}
            name={key}
            value={inputs[key]}
            onChange={handleInputChange}
            margin="dense"
            fullWidth
            style={{ marginBottom: '10px' }}
          />
        ))}
      </div>

      <h3>Table with Inputs</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Row</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <TextField name="name" value={row.name} onChange={(e) => handleTableInputChange(e, row.id)} />
              </TableCell>
              <TableCell>
                <TextField name="age" value={row.age} onChange={(e) => handleTableInputChange(e, row.id)} />
              </TableCell>
              <TableCell>
                <TextField name="email" value={row.email} onChange={(e) => handleTableInputChange(e, row.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Optional: Add a submit button within the dialog */}
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
}

export default InputTable;
