import * as Yup from 'yup';

export const PERMISSON_VALIDATE = Yup.object().shape({
  name: Yup.string().required('Vui lòng chọn thông tin'),
  action: Yup.string().required('Vui lòng chọn thông tin'),
  description: Yup.string().required('Vui lòng điền thông tin')
});
