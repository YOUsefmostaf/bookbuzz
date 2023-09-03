import {createAsyncThunk} from '@reduxjs/toolkit';
import {constsApi} from 'api';
export const getCarousel = createAsyncThunk('get/carsoul', async () => {
  try {
    const response: any = await constsApi.getCarouselData();

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
    return e;
  }
});

export const getAds = createAsyncThunk('get/Ads', async () => {
  try {
    const response: any = await constsApi.getAds();

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
    return e;
  }
});
