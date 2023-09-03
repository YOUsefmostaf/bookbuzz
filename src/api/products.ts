import api from './api';
const FILTER = '/wp-json/bookbuzz/v1/product/filter';
const PRODUCTS = '/wp-json/wc/v3/products';
const AUTHORPRODUCT = 'wp-json/bookbuzz/v1/product/authors';
const RELEATEDPRODUCTS = '/wp-json/bookbuzz/v1/product/related';
const FEATUREDPRODUCTS = 'wp-json/bookbuzz/v1/product/featured';
export const productsApi = {
  getProducts: ({params}: any) => api.get(`${PRODUCTS}`, {...params}),
  filter: ({body, params}: any) =>
    api.post(`${FILTER}`, {...body}, {params: params}),
  getProductsVendor: ({vendor_id, params}: any) =>
    api.get('wp-json/dokan/v1/stores/' + vendor_id + '/products', {...params}),
  getProductsOwner: (id: any) => api.get(`${AUTHORPRODUCT}/${id}`),
  getReleatedProducts: (body: any) =>
    api.post(`${RELEATEDPRODUCTS}`, {...body}),
  getFeatProd: () => api.get(`${FEATUREDPRODUCTS}`),
};
