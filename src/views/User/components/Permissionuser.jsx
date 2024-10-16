/* eslint-disable react-hooks/rules-of-hooks */
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
    queryKey: ['permission'],
    queryFn: () => permApi.getAllPerm(),
    keepPreviousData: true
  });

  // Tạo một object initialValues từ dữ liệu permissions
  const generateInitialValues = (permissions, userPermissions = {}) => {
    const initialValues = {};
    permissions.forEach((permission) => {
      const isChecked = userPermissions[permission.name]?.includes(permission.action) || false;
      initialValues[`${permission.name}_${permission.id}`] = isChecked;
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
    const selectedPermissions = Object.keys(values)
      .filter((key) => values[key])
      .map((key) => key.split('_')[1]);
    const payload = {
      userId: idUser,
      selectedPermissions: selectedPermissions.map(Number)
    };
    addUserPermissions.mutate(payload);
  };

  // Kiểm tra nếu không có dữ liệu hoặc dữ liệu không hợp lệ
  if (!PermData || !Array.isArray(PermData?.data?.data) || PermData.data.data.length === 0) {
    return <div>Chưa có quyền nào được thêm.</div>;
  }

  const safeDataPermission = dataPermission || {};
  const initialValues = generateInitialValues(PermData.data.data, safeDataPermission);
  const groupedPermissions = groupPermissionsByName(PermData.data.data);

  return (
    <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Grid container spacing={2}>
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
                          name={`${moduleName}_${permission.id}`}
                        />
                      }
                      label={permission.action.charAt(0).toUpperCase() + permission.action.slice(1)}
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

Permissionuser.propTypes = {
  dataPermission: PropTypes.object,
  idUser: PropTypes.number
};

export default Permissionuser;
