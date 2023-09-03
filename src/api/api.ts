import {create} from 'apisauce';
import {API_BASE_URL} from 'constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import R from 'reactotron-react-native';

const api = create({
  baseURL: API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});
export const setAuthToken = async (token: string) => {
  try {
    // api.setHeader('token', token);
    await AsyncStorage.setItem('@accessToken', token);
  } catch (e) {
    //@ts-ignore
    R.log('rerr');
  }
};

api.axiosInstance.interceptors.request.use(
  async (config: any) => {
    const value = await AsyncStorage.getItem('@accessToken');
    if (value) {
      config.headers.Authorization = `Bearer ${value}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default api;
