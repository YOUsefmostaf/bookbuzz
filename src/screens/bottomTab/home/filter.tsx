import * as _ from 'lodash';
import * as React from 'react';
import {GradientButton, HeaderApp, Modal} from 'components';
import {FlatList, ScrollView, Text} from 'react-native';
import {AppColors, Fonts, height, width} from 'theme';
import {FilterStyles} from '../homeStyles';
import {BottomTabList} from 'src/navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native-elements';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {
  getCategoryAuthors,
  getCategoryIntrest,
  getCategoryLang,
  selectAuthorsCate,
  selectIntrestCate,
  selectLangCate,
} from 'store/categories';
import {useDispatch, useSelector} from 'react-redux';
import {getSearch, searchActions} from 'store/Search';
import {categiresApi} from 'api';
import {ApiResponse} from 'apisauce';
import {productsApi} from 'api/products';
interface Props {
  navigation: StackNavigationProp<BottomTabList, 'Home'>;
  modal: string;
  route: any;
}
export interface ComponentProps {
  components: {
    name: string;
    component: any;
  }[];
}
export const FilterScreen: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const authorCat = useSelector(selectAuthorsCate);
  const interestCat = useSelector(selectIntrestCate);
  const langCat = useSelector(selectLangCate);
  const searchState = useSelector(getSearch);
  const [loadingFilter, setLoadingFilter] = React.useState(true);
  const [submitLoading, setSubmitLoading] = React.useState(true);
  /**FIlter Inputs */
  const FilterInputs: ComponentProps = {
    components: [
      {
        name: 'byLangs',
        component: () => {
          return (
            <>
              <Text style={FilterStyles.filterText}>choose the language</Text>
              <Button
                // iconRight
                icon={
                  <MatIcon name="arrow-back-ios" color="#313131" size={15} />
                }
                title="choose the language"
                buttonStyle={FilterStyles.filterInput}
                onPress={() => setModal('byLangs')}
                type="outline"
                titleStyle={{color: '#DBDBDB'}}
              />
              {modal === 'byLangs' && (
                <Modal.TitlesModal
                  onHandleLoadMore={onHandleLoadMore}
                  mutliSelect={true}
                  values={searchState.languages}
                  onConfirm={onConfirm}
                  selected={searchState?.filter?.byLangs}
                  title={'اختر اللغة'}
                />
              )}
              {/* {searchState?.languages && Flatlist(searchState?.languages, 3)} */}
            </>
          );
        },
      },
      {
        name: 'byAuthers',
        component: () => {
          return (
            <>
              <Text style={FilterStyles.filterText}>Choose your favorite authors</Text>
              <Button
                // iconRight
                icon={
                  <MatIcon name="arrow-back-ios" color="#313131" size={15} />
                }
                title="Choose your favorite authors"
                buttonStyle={FilterStyles.filterInput}
                type="outline"
                titleStyle={{color: '#DBDBDB'}}
                onPress={() => setModal('byAuthers')}
              />
              {/* {searchState?.authors && Flatlist(searchState?.authors, 2)} */}
              {modal === 'byAuthers' && (
                <Modal.ObjectsModal
                  onHandleLoadMore={onHandleLoadMore}
                  mutliSelect={true}
                  values={searchState.authors}
                  onConfirm={onConfirm}
                  selected={searchState?.filter.byAuthers}
                  title={'اختر مؤلفينك المفضلين'}
                />
              )}
            </>
          );
        },
      },
      {
        name: 'byInterests',
        component: () => {
          return (
            <>
              <Text style={FilterStyles.filterText}>Choose your interests</Text>
              <Button
                // iconRight
                icon={
                  <MatIcon name="arrow-back-ios" color="#313131" size={15} />
                }
                title="Choose your interests"
                buttonStyle={FilterStyles.filterInput}
                type="outline"
                titleStyle={{color: '#DBDBDB'}}
                onPress={() => setModal('byInterests')}
              />
              {modal === 'byInterests' && (
                <Modal.TitlesModal
                  onHandleLoadMore={onHandleLoadMore}
                  mutliSelect={true}
                  values={searchState.interests}
                  onConfirm={onConfirm}
                  selected={searchState?.filter.byInterests}
                  title={'اختر اهتماماتك'}
                />
              )}
              {/* {searchState?.authors && Flatlist(searchState?.authors, 2)} */}
            </>
          );
        },
      },
      {
        name: 'byReleaseDate',
        component: () => {
          return (
            <>
              <Text style={FilterStyles.filterText}>Release Date</Text>
              <Button
                // iconRight
                icon={
                  <MatIcon name="arrow-back-ios" color="#313131" size={15} />
                }
                title="Release Date"
                buttonStyle={FilterStyles.filterInput}
                type="outline"
                titleStyle={{color: '#DBDBDB'}}
                onPress={() => setModal('byReleaseDate')}
              />
              {/* {searchState?.releaseDate && Flatlist(searchState?.releaseDate, 4)} */}
              {modal === 'byReleaseDate' && (
                <Modal.TitlesModal
                  onHandleLoadMore={() => {}}
                  mutliSelect={true}
                  values={searchState.releaseDate}
                  onConfirm={onConfirm}
                  selected={searchState?.filter.byReleaseDate}
                  title={'تاريخ الاصدار'}
                />
              )}
            </>
          );
        },
      },
      {
        name: 'byPublisher',
        component: () => {
          return (
            <>
              <Text style={FilterStyles.filterText}>Publishing House</Text>
              <Button
                // iconRight
                icon={
                  <MatIcon name="arrow-back-ios" color="#313131" size={15} />
                }
                title="Publishing House"
                buttonStyle={FilterStyles.filterInput}
                type="outline"
                titleStyle={{color: '#DBDBDB'}}
                onPress={() => setModal('byPublisher')}
              />
              {modal === 'byPublisher' && (
                <Modal.ObjectsModal
                  onHandleLoadMore={onHandleLoadMore}
                  mutliSelect={true}
                  values={searchState.vendors}
                  onConfirm={onConfirm}
                  selected={searchState?.filter?.byPublisher}
                  title={'دار النشر'}
                />
              )}
            </>
          );
        },
      },
    ],
  };
  console.log('test');
  /**Get FIlter Values to filter by. */
  React.useEffect(() => {
    props.navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    let authors: ApiResponse<any>,
      vendors: ApiResponse<any>,
      interests: ApiResponse<any>,
      languages: ApiResponse<any>;
    let fetch = async () => {
      authors = await categiresApi.getCategory({
        params: {parent: authorCat?.id, per_page: 20, page: searchState.page},
      });
      interests = await categiresApi.getCategory({
        params: {
          parent: interestCat?.id,
          per_page: 20,
          page: searchState.page,
        },
      });
      languages = await categiresApi.getCategory({
        params: {
          parent: langCat?.id,
          per_page: 20,
          page: searchState.page,
        },
      });
      vendors = await categiresApi.getVendors({
        params: {per_page: 20, page: searchState.page},
      });
      let currentYear = new Date().getFullYear(),
        years = [];
      let startYear = 1980;
      while (startYear <= currentYear) {
        years.push({id: startYear, name: startYear});
        ++startYear;
      }
      years = _.sortBy(years, item => item.name, 'asc');
      dispatch(
        searchActions.setItems([
          {
            element: 'authors',
            data: _.flatMap(authors?.data, item => {
              return {id: item?.id, name: item?.name, image: item?.image};
            }),
          },
          {
            element: 'interests',
            data: _.flatMap(interests?.data, item => {
              return {id: item?.id, name: item?.name};
            }),
          },
          {
            element: 'vendors',
            data: _.flatMap(vendors?.data, item => {
              return {
                id: item?.id,
                name: `${item.first_name} ${item.last_name}`,
                image: item?.gravatar,
              };
            }),
          },
          {
            element: 'languages',
            data: _.flatMap(languages?.data, item => {
              return {id: item?.id, name: item?.name};
            }),
          },
          {element: 'releaseDate', data: years},
        ]),
      );
    };
    fetch();
  }, [dispatch]);
  const [modal, setModal] = React.useState(props.modal);
  // on Confirm select
  const onConfirm = (selected: any) => {
    // Set filter search using modal name
    dispatch(
      searchActions.setItemsToFilter([{element: modal, data: selected}]),
    );
    setModal('');
  };
  const onHandleLoadMore = async () => {
    let catId = null,
      result: any = {};
    let page = ++searchState.page;
    dispatch(searchActions.setItems([{element: 'page', data: page}]));
    switch (modal) {
      case 'byLangs':
        result = await categiresApi.getCategory({
          params: {
            parent: langCat?.id,
            per_page: 20,
            page: page,
          },
        });
        dispatch(
          searchActions.appendItems([
            {
              element: 'byLangs',
              data: _.flatMap(result.data, item => {
                return {id: item?.id, name: item?.name};
              }),
            },
          ]),
        );
        break;
      case 'byAuthers':
        result = await categiresApi.getCategory({
          params: {
            parent: authorCat?.id,
            per_page: 20,
            page: page,
          },
        });
        dispatch(
          searchActions.appendItems([
            {
              element: 'byAuthers',
              data: _.flatMap(result.data, item => {
                return {id: item?.id, name: item?.name, image: item?.image};
              }),
            },
          ]),
        );
        break;
      case 'byInterests':
        result = await categiresApi.getCategory({
          params: {
            parent: interestCat?.id,
            per_page: 20,
            page: page,
          },
        });
        dispatch(
          searchActions.appendItems([
            {
              element: 'byInterests',
              data: _.flatMap(result.data, item => {
                return {id: item?.id, name: item?.name};
              }),
            },
          ]),
        );
        break;
      case 'byPublisher':
        result = await categiresApi.getVendors({
          params: {
            per_page: 20,
            page: page,
          },
        });
        dispatch(
          searchActions.appendItems([
            {
              element: 'byPublisher',
              data: _.flatMap(result.data, item => {
                return {id: item?.id, name: item?.name};
              }),
            },
          ]),
        );
        break;
      default:
        break;
    }
  };
  const onSubmit = async () => {
    setSubmitLoading(true);
    let filter = {...searchState.filter};
    filter.byAuthers = _.flatMap(filter.byAuthers, item => item.id);
    filter.byInterests = _.flatMap(filter.byInterests, item => item.id);
    filter.byLangs = _.flatMap(filter.byLangs, item => item.id);
    filter.byPublisher = _.flatMap(filter.byPublisher, item => item.id);
    filter.byReleaseDate = _.flatMap(filter.byReleaseDate, item => item.id);
    // switch between filter vals and route vals
    let routeVals = props.route?.params?.filter?.filterVals;
    let params = {
      author:
        routeVals?.author?.length > 0 ? routeVals.author : filter.byAuthers,
      lang: routeVals?.lang?.length > 0 ? routeVals?.lang : filter.byLangs,
      interests:
        routeVals?.interests?.length > 0
          ? routeVals?.interests
          : filter.byInterests,
      vendor_id: routeVals?.vendor_id
        ? routeVals?.vendor_id
        : filter.byPublisher,
      publish_date:
        routeVals?.publish_date?.length > 0
          ? routeVals?.publish_date
          : filter.byReleaseDate,
    };
    let products = await productsApi.filter({
      body: params,
      params: {per_page: 100, page: 1},
    });
    if (products.data) {
      dispatch(
        searchActions.setItems([
          {element: 'searchResult', data: products.data},
        ]),
      );
      setSubmitLoading(false);
      props.navigation.navigate('FilterR');
    }
  };
  const Flatlist = (items: any, cols: number) => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        numColumns={cols}
        keyExtractor={item => item}
        data={items}
        removeClippedSubviews={true}
        contentContainerStyle={{
          alignItems: 'flex-start',
        }}
        renderItem={({item, index}) => {
          return (
            <Text key={index} style={FilterStyles.selectedItem}>
              {item?.name}
            </Text>
          );
        }}
      />
    );
  };
  return (
    <ScrollView
      style={FilterStyles.FilterScreen}
      showsVerticalScrollIndicator={false}>
      <HeaderApp
        title="filtering"
        hasBack={true}
        backPress={() => props.navigation.navigate('Home')}
      />

      {FilterInputs.components.map(item => {
        let index = props?.route?.params?.filter?.FilterOps?.findIndex(
          (i: any) => i === item.name,
        );
        if (index >= 0) return item.component();
      })}
      <GradientButton
        onPress={onSubmit}
        buttonName="Confirm"
        hasIcon={false}
        bR={32}
        pV={16}
        mgT={68}
        mgB={50}
        buttonWidth={width / 1.1}
        styleText={{
          fontFamily: Fonts.CBOLD,
          fontSize: 15,
          color: '#F6F6F6',
        }}
      />
    </ScrollView>
  );
};
export default FilterScreen;
