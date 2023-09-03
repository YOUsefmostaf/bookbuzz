import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {HeaderApp, BookContainer, VendorContainer} from 'components';
import {Fonts, height, width, wp, AppColors, hp} from 'theme';
import {SEARCH, FILTER} from 'constants/icons';
// import {useDebounce} from 'use-debounce';
import printer from 'reactotron-react-native';
import Spinner from 'react-native-spinkit';
import {Input} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProductsVendor,
  selectLoadingProducts,
  selectProductsVendor,
} from 'store/products';
import normalize from 'react-native-normalize';

export const VendorDetailsScreen = ({navigation}) => {
  const route = useRoute();
  const {vendor} = route.params;

  const [search, setSearch] = useState('');
  // const [searchDelayed] = useDebounce(search, 1000);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProductsVendor({vendor_id: vendor.id, params: {per_page: 9}}));
  }, [dispatch]);

  React.useEffect(() => {
    // dispatch(
    //   getProductsVendor({
    //     vendor_id: vendor.id,
    //     params: {per_page: 9, search: searchDelayed},
    //   }),
    // );
  }, []);

  const products = useSelector(selectProductsVendor);
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

  const renderItem = ({item}: any) => (
    <BookContainer
      book={item}
      onPress={() => navigation.navigate('BookDetails', {book: item})}
      style={{marginTop: height * 0.025, marginHorizontal: width * 0.013}}
    />
  );

  return (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.05}
        hasBack
        onPress={() => navigation.goBack()}
        title="publisher"
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
          flexDirection: 'row-reverse',
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
                  'byReleaseDate',
                  'byAuthers',
                  'byInterests',
                  'byLangs',
                ],
                filterVals: {vendor_id: [vendor?.id]},
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
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: height * 0.01,
          }}>
          <VendorContainer vendor={vendor} />
          <Text
            style={{
              fontFamily: Fonts.CBOLD,
              color: AppColors.red,
              fontSize: 18,
              marginHorizontal: width * 0.05,
              textAlign: 'left',
              marginTop: height * 0.01,
            }}>
            {vendor.store_name}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: Fonts.CREG,
            color: '#313131',
            fontSize: 13,
            marginHorizontal: width * 0.05,
            textAlign: 'left',
            marginTop: height * 0.025,
          }}>
          {vendor.first_name}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.CBOLD,
            color: AppColors.red,
            fontSize: 16,
            marginHorizontal: width * 0.075,
            textAlign: 'right',
            marginTop: height * 0.1,
          }}>
          Publishing house books
        </Text>
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
            {products.length <= 0 ? (
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: hp(15),
                  color: '#c4c4c4',
                  fontFamily: Fonts.CSEMIBOLD,
                  fontSize: normalize(20),
                }}>
                We have no registered books for this publisher
              </Text>
            ) : (
              <FlatList
                data={products}
                numColumns={3}
                renderItem={renderItem}
                scrollEnabled={false}
                contentContainerStyle={{
                  alignItems: 'center',
                  height: height,
                }}
                keyExtractor={item => item.id}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
