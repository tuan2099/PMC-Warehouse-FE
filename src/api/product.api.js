import http from 'utils/http';
const URL = 'products';

const productsApi = {
  getAllProducts() {
    return http.get(`/${URL}`);
  },
  getProduct(id) {
    return http.get(`/${URL}/${id}`);
  },
  createProduct(body) {
    return http.post(`/${URL}`, body);
  },
  deleteProduct(id) {
    return http.delete(`/${URL}/${id}`);
  },
  updateProduct(id, body) {
    return http.put(`/${URL}/${id}`, body);
  }
};

export default productsApi;
