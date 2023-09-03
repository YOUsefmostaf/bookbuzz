import {createSlice} from '@reduxjs/toolkit';
import {
  getCategoryAuthors,
  getCategoryIntrest,
  getCategoryLang,
  getSubCategory,
  getSubIntrest,
  getAuthors,
  getSubCategoryPagination,
  getAuthorsByLang,
} from './categoires.action';
import {RootState} from '../store';
import Toast from 'react-native-toast-message';
import {
  getArabicAuthor,
  getEnglishAuthor,
  getLanguages,
  getTransAuthor,
  getVendors,
} from '.';
interface authState {
  isLoading: boolean;
  categoires: {
    id: any;
    slug: any;
  }[];
  subCategoires: {
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
  subIntrests: {
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
  languages: {
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
  vendors: {
    id: any;
    store_name: any;
    gravatar: any;
  }[];
  cateLang: {
    id: any;
    slug: any;
  };
  cateIntrest: {
    id: any;
    slug: any;
  };
  cateAuthors: {
    id: any;
    slug: any;
  };
  authorsByLang: [];
  arabicAuthor: [];
  englishAuthor: [];
  translatorAuthor: [];
}

const initialState: authState = {
  isLoading: false,
  categoires: [
    {
      id: undefined,
      slug: undefined,
    },
  ],
  subCategoires: [
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
  subIntrests: [
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
  languages: [
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
  vendors: [
    {
      id: undefined,
      store_name: undefined,
      gravatar: undefined,
    },
  ],
  cateAuthors: {
    id: undefined,
    slug: undefined,
  },
  cateIntrest: {
    id: undefined,
    slug: undefined,
  },
  cateLang: {
    id: undefined,
    slug: undefined,
  },
  authorsByLang: [],
  arabicAuthor: [],
  englishAuthor: [],
  translatorAuthor: [],
};

export const categoiresSlice = createSlice({
  name: 'categoires',
  initialState,
  reducers: {
    logout: () => initialState,
    setLang: (state, action) => {
      state.cateLang = action.payload;
    },
    setIntrest: (state, action) => {
      state.cateIntrest = action.payload;
    },
    setAuthors: (state, action) => {
      state.cateAuthors = action.payload;
    },
    setSub: (state, action) => {
      state.subCategoires = action.payload;
    },
    setAuthorByLang: (state, action) => {
      state.authorsByLang = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategoryLang.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cateLang = {
        id: action.payload[0]?.id,
        slug: action.payload[0]?.slug,
      };
    });
    builder.addCase(getCategoryLang.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCategoryLang.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///Inte
    builder.addCase(getCategoryIntrest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cateIntrest = {
        id: action.payload[0]?.id,
        slug: action.payload[0]?.slug,
      };
    });
    builder.addCase(getCategoryIntrest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCategoryIntrest.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///Authors
    builder.addCase(getCategoryAuthors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cateAuthors = {
        id: action.payload[0]?.id,
        slug: action.payload[0]?.slug,
      };
    });
    builder.addCase(getCategoryAuthors.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCategoryAuthors.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///sub
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subCategoires = action.payload;
    });
    builder.addCase(getSubCategory.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getSubCategory.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///SubPAgination
    builder.addCase(getSubCategoryPagination.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subCategoires = [...state.subCategoires, ...action.payload];
    });
    builder.addCase(getSubCategoryPagination.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getSubCategoryPagination.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///subIntrests
    builder.addCase(getSubIntrest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subIntrests = action.payload;
    });
    builder.addCase(getSubIntrest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getSubIntrest.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///authors
    builder.addCase(getAuthors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authors = action.payload;
    });
    builder.addCase(getAuthors.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAuthors.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///vendors
    builder.addCase(getVendors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vendors = action.payload;
    });
    builder.addCase(getVendors.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getVendors.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///languages
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    });
    builder.addCase(getLanguages.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getLanguages.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///
    ///languagesEngilsh
    builder.addCase(getEnglishAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.englishAuthor = action.payload;
    });
    builder.addCase(getEnglishAuthor.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getEnglishAuthor.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///languagesArabic
    builder.addCase(getArabicAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.arabicAuthor = action.payload;
    });
    builder.addCase(getArabicAuthor.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getArabicAuthor.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
    ///languagesTranslaort
    builder.addCase(getTransAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.translatorAuthor = action.payload;
    });
    builder.addCase(getTransAuthor.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTransAuthor.rejected, (state, action: any) => {
      Toast.show({
        type: 'error',
        text1: action.payload?.message,
      });
      state.isLoading = false;
    });
  },
});

export const {setAuthors, setIntrest, setLang, setSub, setAuthorByLang} =
  categoiresSlice.actions;

export const selectLoadingCategories = (state: RootState) =>
  state.categoires.isLoading;
export const selectCategoires = (state: RootState) =>
  state.categoires.categoires;
export const selectSubCategoires = (state: RootState) =>
  state.categoires.subCategoires;
export const selectSubIntrests = (state: RootState) =>
  state.categoires.subIntrests;
export const selectAuthors = (state: RootState) => state.categoires.authors;
export const selectVendors = (state: RootState) => state.categoires.vendors;
export const selectLangCate = (state: RootState) => state.categoires.cateLang;
export const selectIntrestCate = (state: RootState) =>
  state.categoires.cateIntrest;
export const selectAuthorsCate = (state: RootState) =>
  state.categoires.cateAuthors;
////

export const selectAuthorsEnglish = (state: RootState) =>
  state.categoires.englishAuthor;
export const selectAuthorsArabic = (state: RootState) =>
  state.categoires.arabicAuthor;
export const selectAuthorsTranslator = (state: RootState) =>
  state.categoires.translatorAuthor;

export const selectAuthorsByLang = (state: RootState) =>
  state.categoires.authorsByLang;
export default categoiresSlice.reducer;
