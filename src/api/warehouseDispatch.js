import http from 'utils/http';

const warehouseDispatchApi = {
  getAll(page) {
    return http.get(`/warehouse_dispatchs?page=${page || 1}`);
  },
  createWarehouseDispatch(body) {
    return http.post('/warehouse_dispatchs', body);
  },
  updateSignature(id, body) {
    return http.post(`/warehouse_dispatchs/signature/${id}`, body);
  }
};

export default warehouseDispatchApi;
