import http from 'utils/http';

export const registerAcc = (body) => http.post('/register', body);
