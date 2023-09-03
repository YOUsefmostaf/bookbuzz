import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import Toast from 'react-native-toast-message';
import { getAllAuthors, getAllAuthorsPagination } from '.';
interface authState {
  isLoading: boolean;
  authors: {
    id: any;
    name: any;
    slug: any;
    parent: any;
    description: any;
    image: {
      id: any;
      src: any;
    };
  }[];
}

const initialState: authState = {
  isLoading: false,
  authors: [
    {
      id: undefined,
      name: undefined,
      slug: undefined,
      parent: undefined,
      description: undefined,
      image: {
        id: undefined,
        src: undefined,
      },
    },
  ],
};

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllAuthors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authors = action.payload;
    });
    builder.addCase(getAllAuthors.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllAuthors.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });

    builder.addCase(getAllAuthorsPagination.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authors = [...state.authors, ...action.payload];
    });
    builder.addCase(getAllAuthorsPagination.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllAuthorsPagination.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
  },
});

export const selectLoadingAuthors = (state: RootState) =>
  state.authors.isLoading;
export const selectAuthors = (state: RootState) => state.authors.authors;
export default authorsSlice.reducer;
