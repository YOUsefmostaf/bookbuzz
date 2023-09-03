import {createSlice} from '@reduxjs/toolkit';
import {getAds, getCarousel} from './constants.action';
import {RootState} from '../store';
import Toast from 'react-native-toast-message';

interface constState {
  loadingCar: boolean;
  loadingAds: boolean;
  carousel: {
    ID: any;
    title: any;
    description: any;
    image: any;
  }[];
  ads: {
    ID: any;
    title: any;
    description: any;
    image: any;
  }[];
}

const initialState: constState = {
  loadingAds: false,
  loadingCar: false,
  ads: [],
  carousel: [],
};

export const constantsSlice = createSlice({
  name: 'const',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCarousel.fulfilled, (state, action) => {
      state.loadingCar = false;
      state.carousel = action.payload;
    });
    builder.addCase(getCarousel.pending, state => {
      state.loadingCar = true;
    });
    builder.addCase(getCarousel.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loadingCar = false;
    });
    ////
    builder.addCase(getAds.fulfilled, (state, action) => {
      state.loadingAds = false;
      state.ads = action.payload;
    });
    builder.addCase(getAds.pending, state => {
      state.loadingAds = true;
    });
    builder.addCase(getAds.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loadingAds = false;
    });
  },
});

export const selectLoadingAds = (state: RootState) => state.const.loadingAds;
export const selectLoadingCarsoul = (state: RootState) =>
  state.const.loadingCar;
export const selectSliders = (state: RootState) => state.const.carousel;
export const selectAds = (state: RootState) => state.const.ads;
export default constantsSlice.reducer;
