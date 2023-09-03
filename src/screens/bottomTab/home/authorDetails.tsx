import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {HeaderApp, BookContainer, VendorContainer} from 'components';
import {Fonts, height, width, wp, AppColors} from 'theme';
import {useRoute} from '@react-navigation/native';

import printer from 'reactotron-react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProductsAuthor,
  selectLoadingProducts,
  selectProductsAuthor,
} from 'store/products';
import Spinner from 'react-native-spinkit';
import {Circle} from 'react-native-svg';

export const AuthorDetailsScreen = ({navigation}) => {
  const route = useRoute();
  const {author} = route.params;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProductsAuthor({params: {category: author.id, per_page: 9}}));
  }, [dispatch]);

  const products = useSelector(selectProductsAuthor);
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

  return (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.05}
        hasBack
        circ
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          backgroundColor: 'grey',
          width: width * 0.3,
          height: width * 0.3,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -width * 0.15,
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          elevation: 3,
          borderRadius: 13,
          borderWidth: 2,
          borderColor: '#E6E6E6',
        }}>
        <Image
          source={{
            uri: author.image?.src,
          }}
          style={{
            width: width * 0.3,
            height: width * 0.3,
            borderRadius: 13,
          }}
        />
      </View>
      <ScrollView>
        <Text
          style={{
            fontFamily: Fonts.CBOLD,
            color: AppColors.red,
            fontSize: 18,
            marginHorizontal: width * 0.05,
            textAlign: 'center',
            marginTop: height * 0.015,
          }}>
          {author.name}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.CREG,
            color: '#313131',
            fontSize: 13,
            marginHorizontal: width * 0.05,
            textAlign: 'center',
            marginTop: height * 0.015,
          }}>
          {author.description}
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
          Publications
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
      </ScrollView>
    </View>
  );
};
