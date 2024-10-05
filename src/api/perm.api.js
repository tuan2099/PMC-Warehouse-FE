/* eslint-disable prettier/prettier */
import http from 'utils/http';

const permApi = {
  getAllPerm() {
    return http.get('/permissions');
  },
  getPermById(id) {
    return http.get(`/permissions/${id}`);
  },
  createPerm(body) {
    return http.post('/permissions', body);
  },
  deletePerm(id) {
    return http.delete(`/permissions/${id}`);
  },
  updatePerm(id, body) {
    return http.put(`/permissions/${id}`, body);
  }
};

export default permApi;
