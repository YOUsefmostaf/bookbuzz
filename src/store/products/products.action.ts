import {createAsyncThunk} from '@reduxjs/toolkit';
import {productsApi} from 'api';

export const getProducts = createAsyncThunk<any, any, any>(
  'getProducts',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProducts(args);

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
export const getProductsPagination = createAsyncThunk<any, any, any>(
  'getProductsPagination/shd',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProducts(args);

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
export const getProductsNew = createAsyncThunk<any, any, any>(
  'getProductsNew',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProducts(args);

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

export const getProductsPopular = createAsyncThunk<any, any, any>(
  'getProductsPopular',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProducts(args);

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

export const getProductsTag = createAsyncThunk<any, any, any>(
  'getProductsTag',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProducts(args);

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

export const getProductsTagPagination = createAsyncThunk<any, any, any>(
  'getProductsTag/paginagtion',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProducts(args);

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
export const getProductsVendor = createAsyncThunk<any, any, any>(
  'getProductsVendor',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProductsVendor(args);

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
export const getProductsAuthor = createAsyncThunk<any, any, any>(
  'getProductsAuthor',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProducts(args);

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

export const getProductsOwner = createAsyncThunk<any, any, any>(
  'getProductsAuthor/owner',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProductsOwner(args?.id);

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

export const getReleatedProducts = createAsyncThunk<any, any, any>(
  'getProductsAuthor/Releated',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getReleatedProducts(args);

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

export const getProductsWishlist = createAsyncThunk<any, any, any>(
  'getProductsAuthor/wishlist',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await productsApi.getProducts(args);
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

export const getFeatProd = createAsyncThunk('[GET]/Prod', async () => {
  try {
    const response: any = await productsApi.getFeatProd();

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
