import {createSlice} from '@reduxjs/toolkit';
import {getOrdersHistory} from './orders.action';
import {RootState} from '../store';
import Toast from 'react-native-toast-message';

interface authState {
  isLoading: boolean;

  orders: {
    id: any;
    number: any;
    date_created: any;
    status: any;
    currency: any;
    total: any;
    customer: {
      id: any;
    };
    line_items: {
      id: any;
      name: any;
      product_id: any;
      variation_id: any;
      quantity: any;
      tax_class: any;
      subtotal: any;
      subtotal_tax: any;
      total: any;
      total_tax: any;
      taxes: any;
      meta_data: any;
      sku: any;
      price: any;
    }[];
  }[];
}
[];

const initialState: authState = {
  isLoading: false,

  orders: [
    {
      id: undefined,
      number: undefined,
      date_created: undefined,
      status: undefined,
      currency: undefined,
      total: undefined,
      customer: {
        id: undefined,
      },
      line_items: [
        {
          id: undefined,
          name: undefined,
          product_id: undefined,
          variation_id: undefined,
          quantity: undefined,
          tax_class: undefined,
          subtotal: undefined,
          subtotal_tax: undefined,
          total: undefined,
          total_tax: undefined,
          taxes: undefined,
          meta_data: undefined,
          sku: undefined,
          price: undefined,
        },
      ],
    },
  ],
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    logout: () => initialState,
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getOrdersHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrdersHistory.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersHistory.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
  },
});

export const selectLoadingOrders = (state: RootState) => state.orders.isLoading;
export const selectOrders = (state: RootState) => state.orders.orders;
export default ordersSlice.reducer;
