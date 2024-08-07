import axios from 'axios';

class Http {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/api/v1',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

const http = new Http().instance;

export default http;
