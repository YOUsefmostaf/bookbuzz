import {createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit';
import {authApi} from 'api';
import {ApiResponse} from 'apisauce';
import {useDispatch} from 'react-redux';
import tron from 'reactotron-react-native';
import {_try} from 'src/helper/Logger';

export const loginUser = createAsyncThunk<any, any, any>(
  'login',
  async (args: any, {rejectWithValue}) => {
    const {username, password} = args;
    try {
      const response: any = await authApi.login(username, password);
      console.log(response);
      if (response?.data?.message) {
        throw response?.data;
      } else if (response?.data === null) {
        throw 'Error in your Network';
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const googleLogin = createAsyncThunk('login/googele', async () => {
  try {
    const response: any = await authApi.loginGoogle();

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

export const newUser = createAsyncThunk<any, any, any>(
  'Register',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await authApi.register(args);
      if (response?.status === 500) {
        throw response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const updateUserMeta = createAsyncThunk<any, any, any>(
  'Update/Meta',
  async (args: any, {rejectWithValue}) => {
    try {
      if (args?.body) {
        console.log(args.body);
        const response: ApiResponse<any> = await authApi.update(args?.id, {
          meta_data: [args?.body],
        });
        return response.data?.meta_data;
      } else {
        const response: ApiResponse<any> = await authApi.getUser(args?.id);
        return response.data?.meta_data;
      }
    } catch (err) {
      rejectWithValue(err);
    }
  },
);
export const updateUser = createAsyncThunk<any, any, any>(
  'UpdateUser',
  async (args: any, {rejectWithValue}) => {
    try {
      let response: ApiResponse<any>;
      response = args?.body
        ? await authApi.update(args?.id, args?.body)
        : await authApi.getUser(args?.id);
      const birthdate =
        response.data.meta_data[
          response.data.meta_data.findIndex(
            (i: any) => i.key === 'user_birthdate',
          )
        ]?.value;
      return {
        first_name: response.data?.first_name,
        last_name: response.data?.last_name,
        userEmail: response.data?.email,
        id: response.data?.id,
        username: `${response.data?.first_name} ${response.data?.last_name}`,
        phone: response?.data?.username,
        displayName: `${response.data?.first_name} ${response.data?.last_name}`,
        birthdate: birthdate,
        avatar_url: response.data?.avatar_url,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
