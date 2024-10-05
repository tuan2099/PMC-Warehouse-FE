import React, { useEffect, useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Formik } from 'formik';
import { Box, Typography, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';
import permApi from 'api/perm.api';
import { PERMISSON_VALIDATE } from 'store/validate';

const INITIAL_STATE = {
  name: '',
  action: '',
  description: ''
};

const NAME_OPTIONS = [
  { label: 'Người dùng', value: 'user' },
  { label: 'Biển bảng', value: 'product' },
  { label: 'Chuyển kho', value: 'transfer' },
  { label: 'Chữ ký', value: 'signature' }
];

const ACTION_OPTIONS = [
  { label: 'Thêm', value: 'add' },
  { label: 'Sửa', value: 'update' },
  { label: 'Xóa', value: 'delete' }
];

function PermForm({ onClose, reLoadData }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [searchParams] = useSearchParams();
  const isAddMode = searchParams.get('mode') === 'add';
  const actionID = searchParams.get('id');

  console.log();

  const { data: PERMData } = useQuery({
    queryKey: ['PermissonDetail', actionID],
    queryFn: () => permApi.getPermById(actionID),
    enabled: !isAddMode && Boolean(actionID),
    keepPreviousData: true
  });

  useEffect(() => {
    if (PERMData && !isAddMode) {
      const data = {
        name: PERMData?.data.permissionDetail.name,
        action: PERMData?.data.permissionDetail.action,
        description: PERMData?.data.permissionDetail.description
      };
      setState(data);
    }
  }, [PERMData]);

  const handleUpdate = useMutation({
    mutationFn: (body) => permApi.updatePerm(actionID, body),
    onSuccess: () => {
      onClose();
      reLoadData();
      toast.success('Cập nhập thành công');
    }
  });

  const handleCreate = useMutation({
    mutationFn: (body) => permApi.createPerm(body),
    onSuccess: () => {
      onClose();
      reLoadData();
      toast.success('Cập nhập thành công');
    }
  });

  const handleSubmitForm = (data) => {
    if (isAddMode) {
      handleCreate.mutate(data);
    } else {
      handleUpdate.mutate(data);
    }
  };

  return (
    <Formik initialValues={state} validationSchema={PERMISSON_VALIDATE} enableReinitialize onSubmit={(data) => handleSubmitForm(data)}>
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>
            Quản lý quyền hạn
          </Typography>
          <SelectField
            name="name"
            label="Tên"
            value={values.name}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            options={NAME_OPTIONS}
          />
          <SelectField
            name="action"
            label="Hành động"
            value={values.action}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            options={ACTION_OPTIONS}
          />
          <InputField
            name="description"
            label="Mô tả"
            type="text"
            value={values.description}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation size="large" type="submit" variant="contained" color="secondary">
                {isAddMode ? 'Tạo quyền hạn' : 'Cập nhập quyền hạn'}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default PermForm;
