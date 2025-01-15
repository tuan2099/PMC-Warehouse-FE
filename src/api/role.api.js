import http from 'utils/http';

const roleApi = {
  getAllRole() {
    return http.get('/role');
  },
  getRole(id) {
    return http.get(`/role/${id}`);
  },
  createRole(body) {
    return http.post('/role', body);
  },
  updateRole(id, body) {
    return http.put(`/role/${id}`, body);
  },
  deleteRole(id) {
    return http.delete(`/role/${id}`);
  }
};

export default roleApi;
