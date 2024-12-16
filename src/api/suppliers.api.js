import http from 'utils/http';

const suppliersApi = {
  getAllSuplliers() {
    return http.get(`/supplier`);
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
