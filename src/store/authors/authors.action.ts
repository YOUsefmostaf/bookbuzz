import {createAsyncThunk} from '@reduxjs/toolkit';
import {categiresApi} from 'api';

export const getAllAuthors = createAsyncThunk<any, any, any>(
  'getAllAuthors',
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

export const getAllAuthorsPagination = createAsyncThunk<any, any, any>(
  'getAllAuthors/paginagtion',
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