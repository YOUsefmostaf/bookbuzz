import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {HeaderApp, VendorContainer} from 'components';
import {Fonts, height, width, wp, AppColors} from 'theme';
import {SEARCH, FILTER} from 'constants/icons';
import {useRoute} from '@react-navigation/native';
import printer from 'reactotron-react-native';
import {Input} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllVendors,
  getAllVendorsPagination,
  selectLoadingVendors,
  selectVendors,
} from 'store/vendors';
import Spinner from 'react-native-spinkit';

export const VendorsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(getAllVendors({params: {per_page: 10, page: 1}}));
  }, [dispatch]);

  const loadingVendors = useSelector(selectLoadingVendors);
  const vendors = useSelector(selectVendors);

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
    <>
      <VendorContainer
        vendor={item}
        containerStyle={{
          marginTop: height * 0.025,
          marginHorizontal: width * 0.02,
        }}
        naming
        large
        onPress={() => navigation.navigate('VendorDetails', {vendor: item})}
      />
    </>
  );
  const _handleLoadMore = () => {
    let pa = page;
    pa = pa + 1;
    setPage(pa);
    dispatch(
      getAllVendorsPagination({
        params: {per_page: 10, page: pa},
      }),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.05}
        hasBack
        title={'Publishers'}
        onPress={() => navigation.goBack()}
      />

      <Text
        style={{
          fontFamily: Fonts.CBOLD,
          color: AppColors.red,
          fontSize: 16,
          marginHorizontal: width * 0.075,
          textAlign: 'left',
          marginTop: height * 0.01,
        }}>
        Publishers
      </Text>

      <FlatList
        data={vendors}
        numColumns={2}
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
