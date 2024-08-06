import axios from 'axios';

class Http {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: '',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

const http = new Http().instance;

export default http;
