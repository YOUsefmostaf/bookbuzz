import api from './api';

const INTREST = 'wp-json/bookbuzz/v1/user/preferences';

export const preferencesApi = {
  save: (body: any) => api.patch(`${INTREST}`, { ...body }),
  get: () => api.get(`${INTREST}`),
  update: (body: any) => api.patch(`${INTREST}`, { ...body }),
};
