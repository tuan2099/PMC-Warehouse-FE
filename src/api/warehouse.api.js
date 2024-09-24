/* eslint-disable prettier/prettier */
import http from 'utils/http';

const URL = 'warehouses';

const warehouseApi = {
  getAllWarehouse(page) {
    return http.get(`/${URL}?page=${page || 1}`);
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
  }
};

export default warehouseApi;
