import {createSlice} from '@reduxjs/toolkit';
import {
  getProducts,
  getProductsAuthor,
  getProductsNew,
  getProductsPopular,
  getProductsTag,
  getProductsTagPagination,
  getProductsVendor,
  getProductsOwner,
  getReleatedProducts,
  getProductsPagination,
  getFeatProd,
} from './products.action';
import {RootState} from '../store';
import Toast from 'react-native-toast-message';
import {getProductsWishlist} from '.';
interface authState {
  isLoading: boolean;
  loading: boolean;
  owner: {
    term_id: any;
    name: any;
    parent: any;
  }[];
  featProd: [];
  products: {
    id: any;
    name: any;
    slug: any;
    price: any;
    images: {
      id: any;
      src: any;
    }[];
  }[];
  productsNew: {
    id: any;
    name: any;
    slug: any;
    price: any;
    images: {
      id: any;
      src: any;
    }[];
  }[];
  productsPopular: {
    id: any;
    name: any;
    slug: any;
    price: any;
    images: {
      id: any;
      src: any;
    }[];
  }[];
  productsTag: {
    id: any;
    name: any;
    slug: any;
    price: any;
    images: {
      id: any;
      src: any;
    }[];
  }[];
  productsAuthor: {
    id: any;
    name: any;
    slug: any;
    price: any;
    images: {
      id: any;
      src: any;
    }[];
  }[];
  productsVendor: {
    id: any;
    name: any;
    slug: any;
    price: any;
    images: {
      id: any;
      src: any;
    }[];
  }[];
  productsReleated: {
    id: any;
    name: any;
    slug: any;
    price: any;
    images: {
      id: any;
      src: any;
    }[];
  }[];
  productsWishlist: {
    id: any;
    name: any;
    slug: any;
    price: any;
    images: {
      id: any;
      src: any;
    }[];
  }[];
}

const initialState: authState = {
  isLoading: false,
  loading: false,
  products: [
    {
      id: undefined,
      name: undefined,
      slug: undefined,
      price: undefined,
      images: [],
    },
  ],
  owner: [
    {
      term_id: undefined,
      name: undefined,
      parent: undefined,
    },
  ],
  productsNew: [
    {
      id: undefined,
      name: undefined,
      slug: undefined,
      price: undefined,
      images: [],
    },
  ],
  productsPopular: [
    {
      id: undefined,
      name: undefined,
      slug: undefined,
      price: undefined,
      images: [],
    },
  ],
  productsTag: [
    {
      id: undefined,
      name: undefined,
      slug: undefined,
      price: undefined,
      images: [],
    },
  ],
  productsAuthor: [
    {
      id: undefined,
      name: undefined,
      slug: undefined,
      price: undefined,
      images: [],
    },
  ],
  productsVendor: [
    {
      id: undefined,
      name: undefined,
      slug: undefined,
      price: undefined,
      images: [],
    },
  ],
  productsReleated: [],
  productsWishlist: [
    {
      id: undefined,
      name: undefined,
      slug: undefined,
      price: undefined,
      images: [],
    },
  ],
  featProd: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    logout: () => initialState,
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setWishlist: (state, action) => {
      state.productsWishlist = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///
    builder.addCase(getProductsPagination.fulfilled, (state, action) => {
      state.products = [...state.products, ...action.payload];
    });
    builder.addCase(getProductsPagination.pending, state => {});
    builder.addCase(getProductsPagination.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
    });
    ////
    builder.addCase(getProductsOwner.fulfilled, (state, action) => {
      state.owner = action.payload;
    });
    builder.addCase(getProductsOwner.pending, () => {});
    builder.addCase(getProductsOwner.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      // state.isLoading = false;
    });

    builder.addCase(getProductsNew.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsNew = action.payload;
    });
    builder.addCase(getProductsNew.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsNew.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });

    builder.addCase(getProductsPopular.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsPopular = action.payload;
    });
    builder.addCase(getProductsPopular.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsPopular.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });

    builder.addCase(getProductsTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsTag = action.payload;
    });
    builder.addCase(getProductsTag.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsTag.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///
    builder.addCase(getProductsTagPagination.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsTag = [...state.productsTag, ...action.payload];
    });
    builder.addCase(getProductsTagPagination.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsTagPagination.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });

    builder.addCase(getProductsAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsAuthor = action.payload;
    });
    builder.addCase(getProductsAuthor.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsAuthor.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });

    builder.addCase(getProductsVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsVendor = action.payload;
    });
    builder.addCase(getProductsVendor.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsVendor.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///
    builder.addCase(getReleatedProducts.fulfilled, (state, action) => {
      state.loading = false;

      state.productsReleated = action.payload[0]?.related;
    });
    builder.addCase(getReleatedProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(getReleatedProducts.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loading = false;
    });

    builder.addCase(getProductsWishlist.fulfilled, (state, action) => {
      state.productsWishlist = action.payload;
    });
    ///
    builder.addCase(getFeatProd.fulfilled, (state, action) => {
      state.loading = false;

      state.featProd = action.payload;
    });
    builder.addCase(getFeatProd.pending, state => {
      state.loading = true;
    });
    builder.addCase(getFeatProd.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.loading = false;
    });
  },
});

export const {setProducts, setWishlist} = productsSlice.actions;

export const selectLoadingProducts = (state: RootState) =>
  state.products.isLoading;
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsNew = (state: RootState) =>
  state.products.productsNew;
export const selectProductsPopular = (state: RootState) =>
  state.products.productsPopular;
export const selectProductsTag = (state: RootState) =>
  state.products.productsTag;
export const selectProductsAuthor = (state: RootState) =>
  state.products.productsAuthor;
export const selectProductsVendor = (state: RootState) =>
  state.products.productsVendor;
export const selectProductsOwner = (state: RootState) => state.products.owner;
export const selectReleatedProduts = (state: RootState) =>
  state.products.productsReleated;
export const selectProdutsWishlist = (state: RootState) =>
  state.products.productsWishlist;
export const selectProdutsFeat = (state: RootState) => state.products.featProd;
export default productsSlice.reducer;
