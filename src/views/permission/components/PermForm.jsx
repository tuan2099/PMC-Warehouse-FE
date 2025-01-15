import React, { useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Formik } from 'formik';
import { Box, Typography, Button } from '@mui/material';
import InputField from 'ui-component/InputField';

const INITIAL_STATE = {
  name: ''
};

function PermForm({ onClose, reLoadData }) {
  const [state, setState] = useState(INITIAL_STATE);

  const handleSubmitForm = (data) => {
    if (isAddMode) {
      handleCreate.mutate(data);
    } else {
      handleUpdate.mutate(data);
    }
  };

  return (
    <Formik initialValues={state} enableReinitialize onSubmit={(data) => handleSubmitForm(data)}>
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>
            Quản lý quyền hạn
          </Typography>

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation size="large" type="submit" variant="contained" color="secondary">
                {/* {isAddMode ? 'Tạo quyền hạn' : 'Cập nhập quyền hạn'} */}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default PermForm;
