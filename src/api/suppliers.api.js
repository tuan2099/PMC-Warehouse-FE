/* eslint-disable prettier/prettier */
import http from 'utils/http';

const suppliersApi = {
  getAllSuplliers(page) {
    return http.get(`/supplier?page=${page || 1}`);
  },
  getSupplierById(id) {
    return http.get(`/supplier/${id}`);
  },
  createSupplier(body) {
    return http.post('/supplier', body);
  },
  updateSupplier(id, body) {
    return http.put(`/supplier/${id}`, body);
  },
  deleteSupplier(id) {
    return http.delete(`/supplier/${id}`);
  }
};

export default suppliersApi;
