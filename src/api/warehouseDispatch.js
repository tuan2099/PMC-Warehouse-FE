/* eslint-disable prettier/prettier */
import http from 'utils/http';

const warehouseDispatchApi = {
  getAll(page) {
    return http.get(`/warehouse_dispatchs?page=${page || 1}`);
  },
  createWarehouseDispatch(body) {
    return http.post('/warehouse_dispatchs', body);
  },
  updateWarehouseDispatch({ id, body }) {
    return http.put(`/warehouse_dispatchs/${id}`, body);
  },
  updateSignature(id, body) {
    return http.post(`/warehouse_dispatchs/signature/${id}`, body);
  },
  getOne(id) {
    return http.get(`/warehouse_dispatchs/${id}`);
  },
  delete(id) {
    return http.delete(`/warehouse_dispatchs/${id}`);
  },
  getdispatchByUser(id) {
    return http.get(`/warehouse_dispatchs/user/${id}`);
  },
  getDispatchByWarehouse(id) {
    return http.get(`/warehouse_dispatchs/warehouse/${id}`);
  },
  getDispatchByCustomer() {
    return http.get(`/warehouse_dispatchs/customer/${id}`);
  }
};

export default warehouseDispatchApi;
