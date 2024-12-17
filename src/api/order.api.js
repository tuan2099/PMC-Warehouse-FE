/* eslint-disable prettier/prettier */
import http from 'utils/http';

const orderApi = {
  getAllOrders(page) {
    return http.get(`/order?page=${page || 1}`);
  },
  getOrderDetails(orderId) {
    return http.get(`/order/${orderId}`);
  },
  createOrder(body) {
    return http.post('/order', body);
  },
  updateOrder(orderId, body) {
    return http.put(`/order/${orderId}`, body);
  },
  deleteOrder(orderId) {
    return http.delete(`/order/${orderId}`);
  },
  getOrderByUsers(id) {
    return http.get(`/order/user/${id}`);
  },
  getOrderByWarehouse(id) {
    return http.get(`/order/warehouse/${id}`);
  },
  getOrderBySupplier(id) {
    return http.get(`/order/supplier/${id}`);
  }
};

export default orderApi;
