import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import Thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth/auth.slice';
import categoryReducer from './categories/categories.slice';
import vendorsReducer from './vendors/vendors.slice';
import authorsReducer from './authors/authors.slice';
import productReducer from './products/products.slice';
import prefReducer from './pref/pref.slice';
import cartReducer from './cart/cart.slice';
import Search from './Search/initialState';
import ordersReducer from './orders/orders.slice';
import constantsReducer from './constants/constants.slice';
import couponsReducer from './cuopons/coupons.slice';
// import constantReducer from './general/general.slice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cart'],
};
const rootReducer = combineReducers({
  auth: authReducer,
  categoires: categoryReducer,
  vendors: vendorsReducer,
  authors: authorsReducer,
  products: productReducer,
  pref: prefReducer,
  cart: cartReducer,
  search: Search,
  orders: ordersReducer,
  const: constantsReducer,
  coupons: couponsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const reactotron = require('../config/reactotron').default;
const reactotronMiddleware = reactotron.createEnhancer();
let persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(Thunk), reactotronMiddleware),
);

const persistor = persistStore(store);

export {store, persistor};
