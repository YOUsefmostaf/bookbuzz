import api from './api';

const LOGIN = 'wp-json/jwt-auth/v1/token';
const LOGINGOOGLE = 'wp-login.php?loginSocial=google';
const REGISTER = 'wp-json/bookbuzz/v1/register';
const SAVEINTREST = 'wp-json/bookbuzz/v1/user/preferences';
const VERIFY = '/passengers/verify';
const CHANGEPASS = '/passengers/verify-change-password';
const CHANGEPASSWORD = '/passengers/change-password';
const USER = 'wp-json/wc/v3/customers';
const headers: any = {
  'Content-Type': 'multipart/form-data',
  Accept: 'application/json',
};
export const authApi = {
  login: (username: any, password: any) =>
    api.post(`${LOGIN}?username=${username}&password=${password}`),
  register: (formData: FormData) =>
    api.post(`${REGISTER}`, formData, {
      headers,
    }),
  loginGoogle: () => api.get(`${LOGINGOOGLE}`),
  changePass: (body: any) => api.post(`${CHANGEPASS}`, {...body}),
  changePassword: (body: any) => api.post(`${CHANGEPASSWORD}`, {...body}),
  save: (body: any) => api.post(`${SAVEINTREST}`, {...body}),
  verify: (body: any) => api.post(`${VERIFY}`, {...body}),
  update: (id: any, body: any) => api.post(`${USER}/${id}`, {...body}),
  getUser: (id: any) => api.get(`${USER}/${id}`),
};
