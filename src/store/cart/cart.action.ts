import {createAsyncThunk} from '@reduxjs/toolkit';
import {categiresApi, ordersApi} from 'api';

export const getCategoryLang = createAsyncThunk<any, any, any>(
  'getCategory/lang',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

      if (response?.data?.message) {
        throw response?.data;
      } else if (response?.data === null) {
        throw 'Error in your Network';
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const createOrder = createAsyncThunk<any, any, any>(
  'createOrder/post',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await ordersApi.createOrder(args);
      if (response?.data?.message) {
        throw response?.data;
      } else if (response?.data === null) {
        throw 'Error in your Network';
      }
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const createOrderBosta = createAsyncThunk<any, any, any>(
  'createOrder/post/Bosta',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await ordersApi.createDelivery(args);
      if (response?.data?.message) {
        throw response?.data;
      } else if (response?.data === null) {
        throw 'Error in your Network';
      }
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
