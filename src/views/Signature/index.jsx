/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useFormik } from 'formik';
import warehouseDispatchApi from 'api/warehouseDispatch';
import { useParams, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

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
    <form onSubmit={formik.handleSubmit}>
      <div style={{ border: '2px solid black', width: 500, height: 200 }}>
        <SignatureCanvas canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} ref={(data) => setSign(data)} />
      </div>

      <br />
      <button type="button" style={{ height: '30px', width: '60px' }} onClick={handleClear}>
        Clear
      </button>
      <button type="button" style={{ height: '30px', width: '60px' }} onClick={handleGenerate}>
        Save
      </button>

      <br />
      <br />
      <img src={url} alt="Signature" />

      {/* Trường ẩn để lưu chữ ký */}
      <input type="hidden" name="signature" value={formik.values.signature} />

      <br />
      <button type="submit" style={{ height: '30px', width: '80px' }}>
        Submit
      </button>
    </form>
  );
};

export default SignaturePage;
