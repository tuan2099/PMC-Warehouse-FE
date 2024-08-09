import http from 'utils/http';

export const registerAcc = (body) => http.post('users/register', body);

export const loginAcc = (body) => http.post('users/login', body);

const userApi = {
  getAllUser() {
    return http.get('/users');
  },
  adduser(body) {
    return http.post('/users/register', body);
  }
};

export default userApi;
