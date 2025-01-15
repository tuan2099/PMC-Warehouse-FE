import http from 'utils/http';

const URL = 'warehouses';

const warehouseApi = {
  getAllWarehouse(customHeaders) {
    return http.get(`/${URL}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...customHeaders
      }
    });
  },
  addWarehouse(body) {
    return http.post(`/${URL}`, body);
  },
  deleteWarehouse(id) {
    return http.delete(`/${URL}/${id}`);
  },
  updateWarehouse(id, body) {
    return http.put(`/${URL}/${id}`, body);
  },
  getWarehouseById(id) {
    return http.get(`/${URL}/${id}`);
  },
  getWarehouseByUser(id) {
    return http.get(`/${URL}/user/${id}`);
  }
};

export default warehouseApi;
