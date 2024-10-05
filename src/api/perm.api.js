/* eslint-disable prettier/prettier */
import http from 'utils/http';

const permApi = {
  getAllPerm() {
    return http.get('/permission');
  },
  getPermById(id) {
    return http.get(`/permission/${id}`);
  },
  createPerm(body) {
    return http.post('/permission', body);
  },
  deletePerm(id) {
    return http.delete(`/permission/${id}`);
  },
  updatePerm(id, body) {
    return http.put(`/permission/${id}`, body);
  }
};

export default permApi;
