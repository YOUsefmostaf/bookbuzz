import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import Toast from 'react-native-toast-message';
import { getAllVendors, getAllVendorsPagination } from '.';
interface authState {
  isLoading: boolean;
  vendors: {
    id: any;
    store_name: any;
    gravatar: any;
  }[];
}

const initialState: authState = {
  isLoading: false,
  vendors: [
    {
      id: undefined,
      store_name: undefined,
      gravatar: undefined,
    },
  ],
};

export const vendorsSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllVendors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vendors = action.payload;
    });
    builder.addCase(getAllVendors.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllVendors.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });

    builder.addCase(getAllVendorsPagination.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vendors = [...state.vendors, ...action.payload];
    });
    builder.addCase(getAllVendorsPagination.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllVendorsPagination.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
  },
});

export const selectLoadingVendors = (state: RootState) =>
  state.vendors.isLoading;
export const selectVendors = (state: RootState) => state.vendors.vendors;
export default vendorsSlice.reducer;
