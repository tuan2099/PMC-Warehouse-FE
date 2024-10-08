/* eslint-disable prettier/prettier */
import React from 'react';
import { Formik, Form, Field } from 'formik';

function Permissionuser({ dataPermission }) {
  // Kiểm tra nếu dataPermission chưa sẵn sàng
  if (!dataPermission || Object.keys(dataPermission).length === 0) {
    return <div>Loading...</div>; // Hiển thị thông báo chờ khi dữ liệu chưa sẵn sàng
  }

  const initialPermissions = dataPermission;

  const handleSubmit = (permissions) => {
    alert('Dữ liệu quyền đã được gửi: ' + JSON.stringify(permissions));
  };

  return (
    <>
      <Formik
        initialValues={{
          xuat_kho_edit: initialPermissions['xuất kho']?.includes('edit') || false,
          xuat_kho_read: initialPermissions['xuất kho']?.includes('read') || false,
          xuat_kho_view: initialPermissions['xuất kho']?.includes('view') || false,
          xuat_kho_delete: initialPermissions['xuất kho']?.includes('delete') || false
        }}
        onSubmit={(values) => {
          // Chuyển giá trị form thành một object phù hợp
          const selectedPermissions = {
            'xuất kho': Object.keys(values)
              .filter((key) => values[key])
              .map((key) => key.split('_')[2]) // Lấy phần action (edit, read, view, delete)
          };
          handleSubmit(selectedPermissions);
        }}
      >
        {({ values }) => (
          <Form>
            <h3>Xuất kho</h3>
            <label>
              <Field type="checkbox" name="xuat_kho_edit" />
              Sửa
            </label>
            <br />
            <label>
              <Field type="checkbox" name="xuat_kho_read" />
              Đọc
            </label>
            <br />
            <label>
              <Field type="checkbox" name="xuat_kho_view" />
              Xem
            </label>
            <br />
            <label>
              <Field type="checkbox" name="xuat_kho_delete" />
              Xóa
            </label>
            <br />

            <button type="submit">Lưu phân quyền</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Permissionuser;
