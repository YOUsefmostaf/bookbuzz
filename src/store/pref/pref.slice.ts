import {createSlice} from '@reduxjs/toolkit';
import {getPref, savePref, updatePref} from './pref.action';
import {RootState} from '../store';
import Toast from 'react-native-toast-message';
interface prefState {
  loadingSave: boolean;
  loadingUpdate: boolean;
  loadingGet: boolean;
  message: boolean;
  pref: {lang: any[]; authors: any[]; products: any[]};
}

const initialState: prefState = {
  loadingGet: false,
  loadingSave: false,
  loadingUpdate: false,
  message: false,
  pref: {lang: [], authors: [], products: []},
};

export const prefSlice = createSlice({
  name: 'pref',
  initialState,
  reducers: {
    setMessagePref: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(savePref.fulfilled, state => {
      state.loadingSave = false;
      state.message = true;
    });
    builder.addCase(savePref.pending, state => {
      state.loadingSave = true;
    });
    builder.addCase(savePref.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loadingSave = false;
    });
    ///
    builder.addCase(updatePref.fulfilled, state => {
      state.loadingUpdate = false;
    });
    builder.addCase(updatePref.pending, state => {
      state.loadingUpdate = true;
    });
    builder.addCase(updatePref.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loadingUpdate = false;
    });
    ///NewUser
    builder.addCase(getPref.fulfilled, (state, action) => {
      state.loadingGet = false;
      state.pref = action.payload;
    });
    builder.addCase(getPref.pending, state => {
      state.loadingGet = true;
    });
    builder.addCase(getPref.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loadingGet = false;
    });
  },
});

export const {setMessagePref} = prefSlice.actions;

export const selectLoadingGpref = (state: RootState) => state.pref.loadingGet;
export const selectLoadingUpref = (state: RootState) =>
  state.pref.loadingUpdate;
export const selectLoadingSpref = (state: RootState) => state.pref.loadingSave;

export const selectPrefs = (state: RootState) => state.pref.pref;
export const selectMessagePref = (state: RootState) => state.pref.message;
export default prefSlice.reducer;
