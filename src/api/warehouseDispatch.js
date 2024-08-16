import http from 'utils/http';

const warehouseDispatchApi = {
  createWarehouseDispatch(body) {
    return http.post('/warehouse_dispatchs', body);
  }
};

export default warehouseDispatchApi;
