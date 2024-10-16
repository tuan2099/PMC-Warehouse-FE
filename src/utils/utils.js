import axios from 'axios';
import { HttpStatusCode } from '../api/httpStatusCode.enum';

export function isAxiosError(error) {
  return axios.isAxiosError(error);
}
export function isAxiosUnprocessableEntityError(error) {
  return isAxiosError(error) && error.response.status === HttpStatusCode.UnprocessableEntity;
}

const abc = { quantity: 30, product: null, price: 0, totalPriceProduct: 0 };
