import api from './api';

const CAROUSEL = '/wp-json/bookbuzz/v1/carousel';
const ADS = '/wp-json/bookbuzz/v1/ads';
export const constsApi = {
  getCarouselData: () => api.get(`${CAROUSEL}`),
  getAds: () => api.get(`${ADS}`),
};
