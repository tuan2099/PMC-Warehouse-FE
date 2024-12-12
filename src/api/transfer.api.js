import http from 'utils/http';

const transferApi = {
  getAllTransfer(page) {
    return http.get(`/transfer?page=${page || 1}`);
  },
  getTransferById(id) {
    return http.get(`/transfer/${id}`);
  },
  createTransfer(body) {
    return http.post('/transfer', body);
  },
  updateTransfer(body) {
    return http.put(`/transfer/${id}`, body);
  },
  deleteTransfer(id) {
    return http.delete(`/transfer/${id}`);
  },
  getTransferByUser(id) {
    return http.get(`/transfer/user/${id}`);
  },
  getTransferByWarehouse(id, customHeaders) {
    return http.get(`/transfer/warehouse/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...customHeaders
      }
    });
  }
};

export default transferApi;
