/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Formik, Form, Field } from 'formik';

const PermissionForm = ({ initialPermissions, handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        nhap_kho_create: initialPermissions.includes('nhap_kho_create'),
        nhap_kho_edit: initialPermissions.includes('nhap_kho_edit'),
        nhap_kho_delete: initialPermissions.includes('nhap_kho_delete'),
        nhap_kho_view: initialPermissions.includes('nhap_kho_view'),
        xuat_kho_create: initialPermissions.includes('xuat_kho_create'),
        xuat_kho_edit: initialPermissions.includes('xuat_kho_edit'),
        xuat_kho_delete: initialPermissions.includes('xuat_kho_delete'),
        xuat_kho_view: initialPermissions.includes('xuat_kho_view')
      }}
      onSubmit={(values) => {
        // Chuyển đổi giá trị checkbox thành mảng quyền được chọn
        const selectedPermissions = Object.keys(values).filter((key) => values[key] === true);
        handleSubmit(selectedPermissions);
      }}
    >
      {({ values }) => (
        <Form>
          <h3>Nhập kho</h3>
          <label>
            <Field type="checkbox" name="nhap_kho_create" />
            Thêm
          </label>
          <br />
          <label>
            <Field type="checkbox" name="nhap_kho_edit" />
            Sửa
          </label>
          <br />
          <label>
            <Field type="checkbox" name="nhap_kho_delete" />
            Xóa
          </label>
          <br />
          <label>
            <Field type="checkbox" name="nhap_kho_view" />
            Xem
          </label>
          <br />

          <h3>Xuất kho</h3>
          <label>
            <Field type="checkbox" name="xuat_kho_create" />
            Thêm
          </label>
          <br />
          <label>
            <Field type="checkbox" name="xuat_kho_edit" />
            Sửa
          </label>
          <br />
          <label>
            <Field type="checkbox" name="xuat_kho_delete" />
            Xóa
          </label>
          <br />
          <label>
            <Field type="checkbox" name="xuat_kho_view" />
            Xem
          </label>
          <br />

          <button type="submit">Lưu phân quyền</button>
        </Form>
      )}
    </Formik>
  );
};

export default PermissionForm;
