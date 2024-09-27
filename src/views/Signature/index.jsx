/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useFormik } from 'formik';
import warehouseDispatchApi from 'api/warehouseDispatch';
import { useParams, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import AuthWrapper1 from 'views/pages/AuthWrapper1';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import AuthCardWrapper from 'views/pages/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { DeleteOutline, SaveAltOutlined } from '@mui/icons-material';
import userApi from 'api/auth.api';

const SignaturePage = () => {
  const [sign, setSign] = useState();
  const [url, setUrl] = useState('');
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const mutation = useMutation({
    mutationFn: ({ id, body }) => warehouseDispatchApi.updateSignature(id, body),
    onSuccess: () => {
      alert('Chữ ký đã gửi thành công');
    }
  });
  // Khởi tạo Formik

  const { data: userData } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUserById(id),
    enabled: Boolean(id)
  });

  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const formik = useFormik({
    initialValues: {
      signature: '',
      token
    },
    onSubmit: (values) => {
      if (!values.signature) {
        alert('Vui lòng tạo chữ ký trước khi gửi');
        return;
      }
      // Gọi mutation để gửi dữ liệu
      mutation.mutate({
        id,
        body: {
          signature: values.signature,
          token
        }
      });
    }
  });

  const handleClear = () => {
    sign.clear();
    setUrl('');
    formik.setFieldValue('signature', ''); // Xóa giá trị chữ ký trong form
  };

  const handleGenerate = () => {
    const signatureUrl = sign.getTrimmedCanvas().toDataURL('image/png');
    setUrl(signatureUrl);
    formik.setFieldValue('signature', signatureUrl); // Lưu giá trị chữ ký trong form
  };

  return (
    <>
      <AuthWrapper1>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <Link to="#" aria-label="logo">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                              Hi, Welcome Back111
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                              Enter your credentials to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                          <SignatureCanvas
                            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                            ref={(data) => setSign(data)}
                          />
                        </Box>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                          <Button
                            sx={{ mb: 2, px: 4, mx: 4, w: '100%' }}
                            variant="outlined"
                            startIcon={<DeleteOutline />}
                            color="error"
                            onClick={handleClear}
                          >
                            Clear
                          </Button>
                          <Button
                            xs={6}
                            type="submit"
                            sx={{ mb: 2, px: 4, w: '100%' }}
                            variant="outlined"
                            startIcon={<SaveAltOutlined />}
                            onClick={handleGenerate}
                          >
                            Save
                          </Button>
                        </Box>
                      </form>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography component={Link} to="/" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                          Quay lại trang chủ
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            {/* <AuthFooter /> */}
          </Grid>
        </Grid>
      </AuthWrapper1>
    </>
  );
};

export default SignaturePage;
