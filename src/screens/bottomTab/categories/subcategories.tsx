import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {HeaderApp, BookContainer} from 'components';
import {Fonts, height, width, wp, AppColors, hp} from 'theme';
import {SEARCH, FILTER} from 'constants/icons';
import {useRoute} from '@react-navigation/native';
// import {useDebounce} from 'use-debounce';
import printer from 'reactotron-react-native';
import Spinner from 'react-native-spinkit';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectLoadingCategories,
  getSubIntrest,
  selectSubIntrests,
} from 'store/categories';
import {
  getProducts,
  getProductsPagination,
  selectLoadingProducts,
  selectProducts,
} from 'store/products';
import {Input} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {getSearch, searchActions} from 'store/Search';
import {concat, flatMap, join} from 'lodash';
import normalize from 'react-native-normalize';

export const SubcategoriesScreen = ({navigation}) => {
  const route = useRoute();
  const {id, image} = route?.params;

  const [search, setSearch] = useState('');
  // const [searchDelayed] = useDebounce(search, 1000);
  useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({
      tabBarStyle: {display: 'none'},
    });
    return () =>
      parent.setOptions({
        tabBarStyle: {
          height: height * 0.05,
          backgroundColor: '#E6E6E6',
          borderRadius: height * 0.025,
          position: 'absolute',
          bottom: wp(5),
          paddingHorizontal: 5,
          marginHorizontal: width * 0.05,
          borderTopWidth: 0,
          alignItems: 'center',
        },
      });
  }, []);

  const dispatch = useDispatch();
  const loadingSubcategories = useSelector(selectLoadingCategories);
  const loadingProducts = useSelector(selectLoadingProducts);
  const subIntrests = useSelector(selectSubIntrests);
  const products = useSelector(selectProducts);
  const searchState = useSelector(getSearch);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(getSubIntrest({params: {parent: id}}));
    dispatch(getProducts({params: {category: id, per_page: 9}}));
  }, [dispatch, id]);
  const changeSbIntrest = index => {
    setSubIndex(index);
    if (index !== -1) {
      // dispatch(
      //   getProducts({
      //     params: {
      //       category: subIntrests[index].id,
      //       per_page: 9,
      //       search: searchDelayed,
      //     },
      //   }),
      // );
    } else {
      // dispatch(
      //   getProducts({
      //     params: {category: id, per_page: 9, search: searchDelayed},
      //   }),
      // );
    }
  };

  React.useEffect(() => {
    if (subIndex !== -1) {
      // dispatch(
      //   getProducts({
      //     params: {
      //       category: subIntrests[subIndex].id,
      //       per_page: 9,
      //       search: searchDelayed,
      //     },
      //   }),
      // );
    } else {
      // dispatch(
      //   getProducts({
      //     params: {category: id, per_page: 9, search: searchDelayed},
      //   }),
      // );
    }
  }, []);

  const [subIndex, setSubIndex] = useState(-1);

  const renderItem = ({item}) => (
    <BookContainer
      book={item}
      style={{marginTop: height * 0.025, marginHorizontal: width * 0.013}}
      onPress={() => navigation.navigate('BookDetails', {book: item})}
    />
  );
  const _handleLoadMore = () => {
    let pa = page;
    pa = pa + 1;
    setPage(pa);
    // dispatch(
    //   getProductsPagination({
    //     params: {category: id, per_page: 9, page: pa, search: searchDelayed},
    //   }),
    // );
  };
  return (
    <View style={{backgroundColor: '#F6F6F6', flex: 1}}>
      <HeaderApp
        mt={height * 0.1}
        hasBack
        title="products"
        onPress={() => navigation.goBack()}
      />
      <View>
        <FlatList
          contentContainerStyle={{
            marginTop: height * 0.025,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={subIntrests}
          renderItem={({item, index}: any) => {
            return (
              <>
                {index === 0 ? (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: width * 0.015,
                    }}
                    onPress={() => changeSbIntrest(-1)}>
                    <Image
                      source={{
                        uri: image,
                      }}
                      style={
                        subIndex === -1
                          ? {
                              borderColor: AppColors.red,
                              borderWidth: 2,
                              height: width * 0.2,
                              width: width * 0.2,
                              borderRadius: width * 0.1,
                              backgroundColor: 'grey',
                            }
                          : {
                              height: width * 0.2,
                              width: width * 0.2,
                              borderRadius: width * 0.1,
                              backgroundColor: 'grey',
                            }
                      }
                    />
                    <Text
                      style={{
                        marginTop: height * 0.01,
                        color: 'black',
                        fontSize: 12,
                        //   lineHeight: wp(24),
                        fontFamily: Fonts.CREG,
                        textAlign: 'center',
                      }}>
                      All
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={{
                    marginHorizontal: width * 0.015,
                  }}
                  onPress={() => changeSbIntrest(index)}>
                  <Image
                    source={{
                      uri: item.image?.src,
                    }}
                    style={
                      subIndex === index
                        ? {
                            borderColor: AppColors.red,
                            borderWidth: 2,
                            height: width * 0.2,
                            width: width * 0.2,
                            borderRadius: width * 0.1,
                            backgroundColor: 'grey',
                          }
                        : {
                            height: width * 0.2,
                            width: width * 0.2,
                            borderRadius: width * 0.1,
                            backgroundColor: 'grey',
                          }
                    }
                  />
                  <Text
                    style={{
                      marginTop: height * 0.01,
                      color: 'black',
                      fontSize: 12,
                      //   lineHeight: wp(24),
                      fontFamily: Fonts.CREG,
                      textAlign: 'center',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </>
            );
          }}
        />
        <View
          style={{
            width: width * 0.9,
            height: height * 0.06,
            backgroundColor: 'white',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: height * 0.05,
            borderRadius: height * 0.04,
            flexDirection: 'row-reverse',
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10,
            elevation: 3,
          }}>
          <Input
            style={{
              width: width * 0.775,
              borderWidth: 0,
              backgroundColor: 'transparent',
            }}
            textStyle={{
              fontFamily: Fonts.CREG,
              color: '#C5C5C5',
              textAlign: 'left',
              fontSize: 15,
            }}
            value={search}
            onChangeText={nextValue => setSearch(nextValue)}
            accessoryRight={<SEARCH />}
            size="large"
            placeholderTextColor="#C5C5C5"
            placeholder="Search ..."
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FilterS', {
                filter: {
                  FilterOps: [
                    'byLangs',
                    'byAuthers',
                    'byPublisher',
                    'byReleaseDate',
                  ],
                  filterVals: {
                    interests: [id, subIntrests[subIndex]?.id],
                  },
                },
              })
            }
            style={{
              backgroundColor: '#313131',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: width * 0.125,
              borderTopLeftRadius: height * 0.04,
              borderBottomLeftRadius: height * 0.04,
            }}>
            <FILTER />
          </TouchableOpacity>
        </View>
        {loadingProducts ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height * 0.4,
            }}>
            <Spinner
              style={{
                // position: 'absolute',
                transform: [{scaleX: 1}],
                alignSelf: 'center',
                zIndex: 100,
              }}
              isVisible={true}
              size={50}
              type="Bounce"
              color="#FF0F39"
            />
          </View>
        ) : (
          <>
            {products.length > 0 ? (
              <FlatList
                data={products}
                numColumns={3}
                onEndReached={_handleLoadMore}
                onEndReachedThreshold={0.3}
                renderItem={renderItem}
                ListFooterComponent={() =>
                  loadingProducts ? (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{
                        marginBottom: width * 0.1,
                        marginTop: width * 0.02,
                      }}
                    />
                  ) : null
                }
                contentContainerStyle={{
                  alignItems: 'center',
                  paddingBottom: wp(10),
                }}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: hp(15),
                  color: '#c4c4c4',
                  fontFamily: Fonts.CSEMIBOLD,
                  fontSize: normalize(16),
                }}>
                لا يوجد كتب مسجلة فى هذه الخانة و نهدف الى تطويرها من اجلكم
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};
