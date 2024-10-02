/* eslint-disable prettier/prettier */
import http from 'utils/http';

const customerApi = {
  getAllCustomer(page, id, role) {
    return http.get(`/customers?page=${page || 1}&id=${id}&role=${role}`);
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
  }
};

export default customerApi;
