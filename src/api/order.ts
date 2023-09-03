import api from './api';
import {create} from 'apisauce';
const bosta = create({
  baseURL: 'http://stg-app.bosta.co/api/',
});
const ORDERS = '/wp-json/wc/v3/orders';
console.log('api: ', api);

export const ordersApi = {
  getOrders: ({params}: any) => api.get(`${ORDERS}`, {...params}),
  createOrder: (body: any) => api.post(`${ORDERS}`, {...body}),
  createDelivery: (body: any) =>
    bosta.post(
      'v0/deliveries/',
      {...body},
      {
        headers: {
          Authorization:
            '780388f6b8822a7aacfc57bc528347a623e59e8f7ac96f09c4203c1b372d18b8',
        },
      },
    ),
  trackOrder: (id: any) =>
    bosta.get(`v0/deliveries/${id}`, {
      headers: {
        Authorization:
          '780388f6b8822a7aacfc57bc528347a623e59e8f7ac96f09c4203c1b372d18b8',
      },
    }),
};
