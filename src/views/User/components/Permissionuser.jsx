/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types'; // Để kiểm tra kiểu dữ liệu của props
import { Formik, Form } from 'formik';
import { Checkbox, FormControlLabel, Button, Grid, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import permApi from 'api/perm.api'; // Giả định đây là API của bạn
import userApi from 'api/auth.api';

function Permissionuser({ dataPermission, idUser }) {
  // Sử dụng React Query để lấy dữ liệu phân quyền từ API
  const { data: PermData, refetch } = useQuery({
    queryKey: ['permission'], // QueryKey của React Query
    queryFn: () => permApi.getAllPerm(), // Gọi API phân quyền
    keepPreviousData: true // Giữ dữ liệu cũ trước khi có dữ liệu mới
  });

  // Tạo một object initialValues từ dữ liệu permissions
  const generateInitialValues = (permissions, userPermissions = {}) => {
    const initialValues = {};
    permissions.forEach((permission) => {
      const isChecked = userPermissions[permission.name]?.includes(permission.action) || false;
      initialValues[`${permission.name}_${permission.id}`] = isChecked; // Sử dụng id làm tên unique cho checkbox
    });
    return initialValues;
  };

  // Tạo một object để phân nhóm các quyền theo "name" (module)
  const groupPermissionsByName = (permissions) => {
    return permissions.reduce((acc, curr) => {
      const moduleName = curr.name;
      if (!acc[moduleName]) {
        acc[moduleName] = [];
      }
      acc[moduleName].push(curr);
      return acc;
    }, {});
  };

  const addUserPermissions = useMutation({
    mutationFn: (body) => userApi.setPermissions(body),
    onSuccess: () => {
      alert('Thêm quyền thành công');
      refetch();
    }
  });

  const handleSubmit = (values) => {
    // Lấy danh sách các quyền đã chọn (ID của quyền)
    const selectedPermissions = Object.keys(values)
      .filter((key) => values[key]) // Lọc những quyền nào có checked = true
      .map((key) => key.split('_')[1]); // Lấy ID của quyền từ tên của checkbox (ví dụ: 'nhap_kho_4' => lấy 4)
    const payload = {
      userId: idUser,
      selectedPermissions: selectedPermissions.map(Number) // Chuyển thành mảng số
    };
    addUserPermissions.mutate(payload);
  };

  if (!PermData) {
    return <div>Loading...</div>;
  }

  const safeDataPermission = dataPermission || {};
  const initialValues = generateInitialValues(PermData.data, safeDataPermission);
  const groupedPermissions = groupPermissionsByName(PermData.data);

  return (
    <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Grid container spacing={2}>
            {/* Render các nhóm phân quyền */}
            {Object.keys(groupedPermissions).map((moduleName) => (
              <React.Fragment key={moduleName}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6">Phân quyền {moduleName}</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  {groupedPermissions[moduleName].map((permission) => (
                    <FormControlLabel
                      key={`${moduleName}_${permission.id}`}
                      control={
                        <Checkbox
                          checked={values[`${moduleName}_${permission.id}`]}
                          onChange={handleChange}
                          name={`${moduleName}_${permission.id}`} // Sử dụng ID làm phần unique cho tên
                        />
                      }
                      label={permission.action.charAt(0).toUpperCase() + permission.action.slice(1)} // In hoa chữ cái đầu của action
                    />
                  ))}
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Lưu phân quyền
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

// Định nghĩa propTypes để kiểm tra kiểu dữ liệu của props
Permissionuser.propTypes = {
  dataPermission: PropTypes.object // Định nghĩa dataPermission là object
};

export default Permissionuser;
