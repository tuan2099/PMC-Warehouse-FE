import axios from 'axios';

class Http {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

const http = new Http().instance;

export default http;
