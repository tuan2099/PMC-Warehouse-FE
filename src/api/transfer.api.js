import http from 'utils/http';

const transferApi = {
  getAll(page) {
    return http.get(`/transfer?page=${page || 1}`);
  }
};

export default transferApi;
