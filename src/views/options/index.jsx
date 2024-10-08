import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import PermissionForm from './components/optionForm';
function Option() {
  const fakeInitialPermissions = ['nhap_kho_create', 'xuat_kho_view', 'xuat_kho_edit'];

  const [initialPermissions] = useState(fakeInitialPermissions);

  const handleSubmit = (permissions) => {
    console.log('Các quyền đã chọn:', permissions);
    alert('Dữ liệu quyền đã được gửi: ' + permissions.join(', '));
  };
  return (
    <div>
      Option
      <PermissionForm initialPermissions={initialPermissions} handleSubmit={handleSubmit} />
    </div>
  );
}

export default Option;
