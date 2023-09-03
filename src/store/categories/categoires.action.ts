import {createAsyncThunk} from '@reduxjs/toolkit';
import {categiresApi} from 'api';

export const getCategoryLang = createAsyncThunk<any, any, any>(
  'getCategory/lang',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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
export const getCategoryIntrest = createAsyncThunk<any, any, any>(
  'getCategory/intrest',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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
export const getCategoryAuthors = createAsyncThunk<any, any, any>(
  'getCategory/authors',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);
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

export const getSubCategory = createAsyncThunk<any, any, any>(
  'getSubCategory',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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
export const getSubCategoryPagination = createAsyncThunk<any, any, any>(
  'getSubCategory/pagination',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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

export const getSubIntrest = createAsyncThunk<any, any, any>(
  'getSubIntrest',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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

export const getAuthors = createAsyncThunk<any, any, any>(
  'getAuthors',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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

export const getVendors = createAsyncThunk<any, any, any>(
  'getVendors',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getVendors(args);

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

export const getLanguages = createAsyncThunk<any, any, any>(
  'getAuthors/lang',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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
export const getArabicAuthor = createAsyncThunk<any, any, any>(
  'getAuthors/lang/Bay/Arabic',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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
export const getEnglishAuthor = createAsyncThunk<any, any, any>(
  'getAuthors/lang/Bay/enbgils',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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
export const getTransAuthor = createAsyncThunk<any, any, any>(
  'getAuthors/lang/Bay/Trans',
  async (args: any, {rejectWithValue}) => {
    try {
      const response: any = await categiresApi.getCategory(args);

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
