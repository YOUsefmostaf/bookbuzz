import {createAsyncThunk} from '@reduxjs/toolkit';
import {preferencesApi} from 'api';

export const savePref = createAsyncThunk<any, any, any>(
  'save/Pref',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await preferencesApi.save(args);
      // console.log(response?.data)

      if (
        response?.status === 500 ||
        response?.status === 400 ||
        response.status === 403
      ) {
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

export const getPref = createAsyncThunk('get/pref', async () => {
  try {
    const response: any = await preferencesApi.get();

    if (response?.data?.message) {
      throw response?.data;
    } else if (response?.data === null) {
      throw 'Error in your Network';
    }
    return response.data;
  } catch (e) {
    return e;
  }
});

export const updatePref = createAsyncThunk<any, any, any>(
  'update/pref',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await preferencesApi.update(args);

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
