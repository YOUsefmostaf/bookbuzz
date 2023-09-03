import {createSlice} from '@reduxjs/toolkit';
import {pay} from 'api';
import {createOrder, createOrderBosta} from './cart.action';
import {RootState} from '../store';
import tron from 'reactotron-react-native';
import Toast from 'react-native-toast-message';
interface cartState {
  line_items: any[];
  loadingPay: boolean;
  tokenToPay: any;
  loadingOrder: any;
  loadingBosta: any;
  loadingCoupons: boolean;
}

const initialState: cartState = {
  line_items: [],
  loadingPay: false,
  tokenToPay: undefined,
  loadingOrder: false,
  loadingBosta: false,
  loadingCoupons: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists: any = state.line_items.find(
        (item: any) => item.id === action.payload.id,
      );
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.line_items.push({...action.payload, quantity: 1});
      }
    },
    incrementQuantity: (state, action) => {
      let newList = [...state.line_items];
      let indexx = newList.findIndex(i => i.id === action.payload?.id);
      newList[indexx] = {
        ...newList[indexx],
        quantity: action.payload?.quantity + 1,
      };
      state.line_items = newList;
    },
    decrementQuantity: (state, action) => {
      let newList = [...state.line_items];
      let indexx = newList.findIndex(i => i.id === action.payload?.id);
      if (newList[indexx]?.quantity === 1) {
        const index = state.line_items.findIndex(
          item => item.id === action.payload?.id,
        );
        state.line_items.splice(index, 1);
      } else {
        newList[indexx] = {
          ...newList[indexx],
          quantity: action.payload?.quantity - 1,
        };
        state.line_items = newList;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.line_items.findIndex(
        item => item.id === action.payload,
      );
      state.line_items.splice(index, 1);
    },
    clearCart: () => initialState,
    setLoadingPay: (state, action) => {
      state.loadingPay = action.payload;
    },
    setTokenPay: (state, action) => {
      state.tokenToPay = action.payload;
    },
    setLoadingOrder: (state, action) => {
      state.loadingOrder = action.payload;
    },
    setLoadingOrderBosta: (state, action) => {
      state.loadingBosta = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  setLoadingPay,
  clearCart,
  setTokenPay,
  setLoadingOrder,
  setLoadingOrderBosta,
} = cartSlice.actions;

export const payOnline = (
  apiToken: any,
  total: any,
  cartItems: any,
  email: any,
  Fname: any,
  street: any,
  phone: any,
  city: any,
  lastName: any,
): any => {
  return async (dispatch: any) => {
    dispatch(setLoadingOrder(true));
    try {
      const result = await dispatch(
        createOrder({
          payment_method: 'accept-online',
          set_paid: true,
          billing: {
            first_name: Fname,
            last_name: Fname,
            address_1: street,
            address_2: '',
            city: city,
            state: 'EG',
            postcode: '94103',
            country: 'EG',
            email: email,
            phone: phone,
          },
          shipping: {
            first_name: Fname,
            last_name: Fname,
            address_1: street,
            address_2: '',
            city: city,
            state: 'EG',
            postcode: '94103',
            country: 'EG',
          },
          line_items: cartItems,
          shipping_lines: [
            {
              method_id: 'flat_rate',
              method_title: 'Flat Rate',
              total: '10.00',
            },
          ],
        }),
      );
      if (result && result?.payload === 201) {
        dispatch(setLoadingOrder(true));
        try {
          const inares: any = await pay(
            apiToken,
            total,
            cartItems,
            email,
            Fname,
            street,
            phone,
            city,
            lastName,
          );
          dispatch(setTokenPay(inares?.token));
          dispatch(setLoadingOrder(false));
        } catch (error) {
          // dispatch(setError(error));
          //@ts-ignore
          tron.logImportant('result', error);
          Toast.show({
            type: 'error',
            text1: error,
          });
          // dispatch(setStatus('fail'));

          dispatch(setLoadingOrder(false));
        }
      }
      dispatch(setLoadingOrder(false));
      // //@ts-ignore
      // tron.logImportant('resultssssss', inares?.token);
      // dispatch(setTokenPay(inares?.token));
    } catch (error) {
      // dispatch(setError(error));
      //@ts-ignore
      tron.logImportant('result', error);
      Toast.show({
        type: 'error',
        text1: error,
      });
      // dispatch(setStatus('fail'));

      dispatch(setLoadingOrder(false));
    }
  };
};

export const payCOD = (
  cartItems: any,
  email: any,
  Fname: any,
  street: any,
  phone: any,
  city: any,
  navigation: any,
): any => {
  return async (dispatch: any) => {
    dispatch(setLoadingOrder(true));
    try {
      const result = await dispatch(
        createOrder({
          payment_method: 'cod',
          set_paid: true,
          billing: {
            first_name: Fname,
            last_name: Fname,
            address_1: street,
            address_2: '',
            city: city,
            state: 'EG',
            postcode: '94103',
            country: 'EG',
            email: email,
            phone: phone,
          },
          shipping: {
            first_name: Fname,
            last_name: Fname,
            address_1: street,
            address_2: '',
            city: city,
            state: 'EG',
            postcode: '94103',
            country: 'EG',
          },
          line_items: cartItems,
          shipping_lines: [
            {
              method_id: 'flat_rate',
              method_title: 'Flat Rate',
              total: '10.00',
            },
          ],
        }),
      );
      tron.logImportant('hay rest', result);
      if (result.payload && result?.payload?.status === 201) {
        dispatch(setLoadingOrderBosta(true));
        try {
          const resBosta = await dispatch(
            createOrderBosta({
              type: 10,
              specs: {
                size:
                  cartItems.length <= 5
                    ? 'SMALL'
                    : cartItems.length > 5
                    ? 'MEDIUM'
                    : cartItems.length > 10 && 'LARGE',
                packageDetails: {
                  itemsCount: cartItems.length,
                  document: 'parcel',
                  description: 'Desc',
                },
              },
              returnSpecs: {
                size:
                  cartItems.length <= 5
                    ? 'SMALL'
                    : cartItems.length < 5
                    ? 'MEDIUM'
                    : 'LARGE',
                packageDetails: {
                  itemsCount: cartItems.length,
                  document: 'parcel',
                  description: 'Desc',
                },
              },
              notes: 'Welcome',
              cod: 2000,
              dropOffAddress: {
                district: {
                  _id: 'q666sjR_3XO',
                  name: 'Asyut',
                },
              },
              firstLine: 'street',
              secondLine: 'test',
              buildingNumber: '123',
              isWorkAddress: false,
              zone: {
                _id: 'CysfLBKevjl',
                name: 'Asyut',
              },
              city: 'Assuit',
              returnAddress: {
                district: 'Maadi',
                firstLine: 'Maadi',
                secondLine: 'City',
                buildingNumber: '123',
                isWorkAddress: true,
                zone: 'Maadi & Muqattam',
                city: 'Cairo',
              },
              allowToOpenPackage: true,
              businessReference: result.payload.data.id,
              receiver: {
                firstName: Fname,
                lastName: Fname,
                phone: phone,
                email: email,
              },
            }),
          );
          tron.logImportant('bosta', resBosta);
        } catch (error) {
          dispatch(setLoadingOrderBosta(false));
          Toast.show({
            type: 'error',
            text1: error,
          });
        }

        navigation.navigate('OrderSuccess');
        dispatch(clearCart());
      } else {
        navigation.navigate('OrderFail');
      }
      dispatch(setLoadingOrderBosta(false));
      dispatch(setLoadingOrder(false));
    } catch (error) {
      dispatch(setLoadingOrder(false));
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };
};
export const selectItems = (state: RootState) => state.cart.line_items;
export const selectTokenToPay = (state: RootState) => state.cart.tokenToPay;
export const selectLoadingPay = (state: RootState) => state.cart.loadingOrder;
export default cartSlice.reducer;
