import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {HeaderApp, BookContainer} from 'components';
import {Fonts, height, width, wp, AppColors} from 'theme';
import {SEARCH, FILTER} from 'constants/icons';
import {useRoute} from '@react-navigation/native';
import printer from 'reactotron-react-native';
import {Input} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProductsTag,
  selectLoadingProducts,
  selectProductsTag,
  getProductsTagPagination,
} from 'store/products';
import Spinner from 'react-native-spinkit';

export const TagsScreen = ({navigation}) => {
  const route = useRoute();
  const {orderby} = route.params;
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(
      getProductsTag({params: {orderby: orderby, per_page: 10, page: 1}}),
    );
  }, [dispatch, orderby]);

  const productsTag = useSelector(selectProductsTag);
  const loadingProducts = useSelector(selectLoadingProducts);

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
    dispatch(
      getProductsTagPagination({
        params: {orderby: orderby, per_page: 10, page: pa},
      }),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.05}
        hasBack
        title={orderby === 'date' ? 'New books' : 'Best sales'}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          width: width * 0.9,
          height: height * 0.06,
          backgroundColor: 'white',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: -height * 0.03,
          borderRadius: height * 0.04,
          flexDirection: 'row',
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          elevation: 3,
          marginBottom: height * 0.02,
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
            textAlign: 'right',
            fontSize: 15,
          }}
          accessoryLeft={<SEARCH />}
          size="large"
          placeholderTextColor="#C5C5C5"
          placeholder="ابحث ..."
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('FilterS')}
          style={{
            backgroundColor: '#313131',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: width * 0.125,
            borderTopRightRadius: height * 0.04,
            borderBottomRightRadius: height * 0.04,
          }}>
          <FILTER />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontFamily: Fonts.CBOLD,
          color: AppColors.red,
          fontSize: 16,
          marginHorizontal: width * 0.075,
          textAlign: 'left',
          marginTop: height * 0.01,
        }}>
        {orderby === 'date' ? 'الكتب الجديدة' : 'أفضل المبيعات'}{' '}
      </Text>

      <FlatList
        data={productsTag}
        numColumns={3}
        onEndReached={_handleLoadMore}
        onEndReachedThreshold={0.3}
        renderItem={renderItem}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: wp(10),
          // height: height,
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
