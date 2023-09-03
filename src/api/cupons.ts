import api from './api';

const GETCOUPPONS = '/wp-json/wc/v3/coupons';
export const couponsApi = {
  getCoupons: () => api.get(`${GETCOUPPONS}`),
};
