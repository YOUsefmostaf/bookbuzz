import {createSlice} from '@reduxjs/toolkit';
import {setAuthToken} from 'api/api';
import {loginUser, googleLogin, newUser} from './auth.action';
import {RootState} from '../store';
import tron from 'reactotron-react-native';
import Toast from 'react-native-toast-message';
import {updateUser, updateUserMeta} from '.';
interface authState {
  isAuthenticated: boolean;
  loading: boolean;
  messageLO: boolean;
  loadingG: boolean;
  loadingReg: boolean;
  isCompleteSetUp: boolean;
  messageReg: boolean;
  isFinish: boolean;
  lang: [];
  interests: [];
  authors: [];
  user: {
    first_name: any;
    last_name: any;
    userId: any;
    token: any;
    userEmail: any;
    username: any;
    displayName: any;
    phone: any;
    birthdate: any;
    avatar_url: any;
  };
  userMeta: any;
}

const initialState: authState = {
  isAuthenticated: false,
  loading: false,
  loadingG: false,
  isCompleteSetUp: false,
  loadingReg: false,
  messageReg: false,
  messageLO: false,
  isFinish: false,
  lang: [],
  interests: [],
  authors: [],
  user: {
    first_name: undefined,
    last_name: undefined,
    token: undefined,
    userId: undefined,
    userEmail: undefined,
    username: undefined,
    displayName: undefined,
    birthdate: undefined,
    phone: undefined,
    avatar_url: undefined,
  },

  userMeta: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setComplete: (state, action) => {
      state.isCompleteSetUp = action.payload;
    },
    setAuthors: (state, action) => {
      state.authors = action.payload;
    },
    setMessagLOG: (state, action) => {
      state.messageLO = action.payload;
    },
    setIntersts: (state, action) => {
      state.interests = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setMessage: (state, action) => {
      state.messageReg = action.payload;
    },
    setFinsish: (state, action) => {
      state.isFinish = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.messageLO = true;
      console.log(action.payload.id);
      state.user = {
        first_name: '',
        last_name: '',
        token: action.payload?.token,
        userId: action?.payload.id,
        userEmail: action.payload?.user_email,
        username: action.payload?.user_nicename,
        phone: action.payload?.phone,
        birthdate: action.payload?.birthdate,
        displayName: action.payload?.user_display_name,
        avatar_url: action.payload?.avatar_url,
      };
      setAuthToken(action.payload?.token);
    });
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1:
          action.payload?.code === '[jwt_auth] invalid_username' &&
          'الرقم غير موجود مسبقا',
      });
      state.loading = false;
    });
    builder.addCase(googleLogin.fulfilled, state => {
      state.loadingG = false;
      // state.isAuthenticated = true;
      // state.user = {
      //   token: action.payload?.token,
      //   userEmail: action.payload?.user_email,
      //   username: action.payload?.user_nicename,
      // };
      // setAuthToken(action.payload?.token);
    });
    builder.addCase(googleLogin.pending, state => {
      state.loadingG = true;
    });
    builder.addCase(googleLogin.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loadingG = false;
    });
    ///NewUser
    builder.addCase(newUser.fulfilled, state => {
      state.loadingReg = false;
      state.messageReg = true;
    });
    builder.addCase(newUser.pending, state => {
      state.loadingReg = true;
    });
    builder.addCase(newUser.rejected, (state, action) => {
      Toast.show({
        type: 'error',
        text1: ' عفوا , الايميل موجود مسبقا او الرقم',
      });
      state.loadingReg = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      let user = {
        first_name: action.payload?.first_name,
        last_name: action.payload?.last_name,
        userId: action.payload?.id,
        userEmail: action.payload?.userEmail,
        username: action.payload?.username,
        phone: action?.payload?.phone,
        displayName: action.payload.displayName,
        birthdate: action.payload.birthdate,
        avatar_url: action.payload.avatar_url,
        token: state.user.token,
      };
      state.user = user;
    });
    builder.addCase(updateUserMeta.fulfilled, (state, action) => {
      state.userMeta = action.payload;
    });
  },
});

export const {
  logout,
  setComplete,
  setAuthors,
  setLang,
  setIntersts,
  setMessage,
  setFinsish,
  setMessagLOG,
} = authSlice.actions;

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectLoadingReg = (state: RootState) => state.auth.loadingReg;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserMeta = (state: RootState) => state.auth.userMeta;
export const selectMessage = (state: RootState) => state.auth.messageReg;
export const selectIsComplete = (state: RootState) =>
  state.auth.isCompleteSetUp;
export const selectLOG = (state: RootState) => state.auth.messageLO;
export const selectAuthors = (state: RootState) => state.auth.authors;
export const selectLangs = (state: RootState) => state.auth.lang;
export const selectIntrest = (state: RootState) => state.auth.interests;

export const selectAuthentication = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectisFisnh = (state: RootState) => state.auth.isFinish;
export default authSlice.reducer;
