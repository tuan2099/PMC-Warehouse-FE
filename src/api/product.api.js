/* eslint-disable prettier/prettier */
import http from 'utils/http';
const URL = 'products';

const productsApi = {
  getAllProducts() {
    return http.get(`/${URL}`);
  }
};

export default productsApi;
