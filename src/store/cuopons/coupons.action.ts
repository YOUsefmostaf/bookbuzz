import {createAsyncThunk} from '@reduxjs/toolkit';
import {couponsApi} from 'api';
export const getCoupons = createAsyncThunk('get/Coupons', async () => {
  try {
    const response: any = await couponsApi.getCoupons();
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
