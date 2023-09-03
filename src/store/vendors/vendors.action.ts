import {createAsyncThunk} from '@reduxjs/toolkit';
import {categiresApi} from 'api';

export const getAllVendors = createAsyncThunk<any, any, any>(
  'getAllVendors',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getVendors(args);

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

export const getAllVendorsPagination = createAsyncThunk<any, any, any>(
  'getAllVendors/pagination',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getVendors(args);

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