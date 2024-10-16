import * as Yup from 'yup';

export const PERMISSON_VALIDATE = Yup.object().shape({
  name: Yup.string().required('Vui lòng chọn thông tin'),
  action: Yup.string().required('Vui lòng chọn thông tin'),
  description: Yup.string().required('Vui lòng điền thông tin')
});

export const ORDER_VALIDATE = Yup.object().shape({
  purchaseDate: Yup.date().required('Vui lòng chọn ngày nhập kho'),
  purchaseType: Yup.string().required('Vui lòng chọn loại nhập kho'),
  warehouseID: Yup.string().required('Vui lòng chọn kho'),
  supplierId: Yup.string().required('Vui lòng chọn nhà cung cấp'),
  purchaseVATAmount: Yup.number().min(0, 'VAT không thể âm').max(100, 'VAT không thể lớn hơn 100%').required('Vui lòng nhập VAT'),
  paymentStatus: Yup.string().required('Vui lòng chọn trạng thái thanh toán'),
  orderDetail: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.string().required('Vui lòng chọn sản phẩm'),
        quantity: Yup.number().min(1, 'Số lượng phải lớn hơn 0').required('Vui lòng nhập số lượng')
      })
    )
    .min(1, 'Cần ít nhất một sản phẩm'),
  note: Yup.string().nullable() // Ghi chú không bắt buộc
});
