import {RootState} from 'store/store';
import {createSlice} from '@reduxjs/toolkit';
import reducers from './reducers';

interface SearchState {
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
  interests: {
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
    name: any;
    image: any;
  }[];
  filter: {
    Hshow: any;
    byLangs: any;
    byInterests: any;
    byAuthers: any;
    byReleaseDate: any;
    byPublisher: any;
  };
  releaseDate: {id: any; name: any}[];
  parentRoute: string;
  ids: string;
  searchResult: any[];
  page: number;
}

const SearchState: SearchState = {
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
  interests: [
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
      name: undefined,
      image: undefined,
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
  releaseDate: [{id: undefined, name: undefined}],
  parentRoute: '',
  filter: {
    Hshow: undefined,
    byLangs: undefined,
    byInterests: undefined,
    byAuthers: undefined,
    byReleaseDate: undefined,
    byPublisher: undefined,
  },
  ids: '',
  searchResult: [],
  page: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: SearchState,
  reducers: reducers,
});

export const getSearch = (state: RootState) => state.search;
export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
