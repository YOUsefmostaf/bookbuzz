import {createAsyncThunk} from '@reduxjs/toolkit';
import {ordersApi} from 'api';

export const getOrdersHistory = createAsyncThunk<any, any, any>(
  'getOrders/history',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await ordersApi.getOrders(args);
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
