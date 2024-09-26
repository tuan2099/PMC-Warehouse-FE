import http from 'utils/http';

const suppliersApi = {
  getAll(page) {
    return http.get(`/supplier?page=${page || 1}`);
  }
};

export default suppliersApi;
