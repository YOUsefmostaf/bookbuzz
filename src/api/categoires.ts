import api from './api';

const CATEGORIES = '/wp-json/wc/v3/products/categories';
const VENDORS = '/wp-json/dokan/v1/stores';
export const categiresApi = {
  getCategory: ({params}: any) => api.get(`${CATEGORIES}`, {...params}),
  getVendors: ({params}: any) => api.get(`${VENDORS}`, {...params}),
};
