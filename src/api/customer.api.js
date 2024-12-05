/* eslint-disable prettier/prettier */
import http from 'utils/http';

const customerApi = {
  getAllCustomer(customHeaders) {
    return http.get(`/customers`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...customHeaders
      }
    });
  },
  getCustomer(id) {
    return http.get(`/customers/${id}`);
  },
  creteCustomer(body) {
    return http.post('/customers', body);
  },
  deleteCustomer(id) {
    return http.delete(`/customers/${id}`);
  },
  updateCustomer(id, body) {
    return http.put(`/customers/${id}`, body);
  },
  getCustomerByUser(id) {
    return http.get(`/customers/user/${id}`);
  }
};

export default customerApi;
