import {createSlice} from '@reduxjs/toolkit';
import {getCoupons} from './coupons.action';
import {RootState} from '../store';
import Toast from 'react-native-toast-message';
interface couponsState {
  loadingCoupns: boolean;
  coupons: [];
}

const initialState: couponsState = {
  loadingCoupns: false,
  coupons: [],
};

export const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.loadingCoupns = false;
      state.coupons = action.payload;
    });
    builder.addCase(getCoupons.pending, state => {
      state.loadingCoupns = true;
    });
    builder.addCase(getCoupons.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loadingCoupns = false;
    });
  },
});

export const {} = couponsSlice.actions;

export const selectLoadingCoupons = (state: RootState) =>
  state.coupons.loadingCoupns;
export const selectCoupons = (state: RootState) => state.coupons.coupons;

export default couponsSlice.reducer;
