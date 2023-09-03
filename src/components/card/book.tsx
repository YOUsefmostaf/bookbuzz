import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {STAR} from 'constants/icons';
import printer from 'reactotron-react-native';
import {componentsStyles} from 'components/componentStyles';
import {width, height, Fonts} from 'theme';

export const BookContainer = ({book, image, style, large, onPress}: any) => {
  // console.log(book)
  return (
    <TouchableOpacity
      style={[large ? {width: width * 0.35} : {width: width * 0.28}, style]}
      onPress={() => (onPress ? onPress() : null)}>
      <Image
        source={{
          // uri: book.images?.length > 0 ? book.images[0]?.src : image,
        }}
        style={
          large
            ? {
                width: width * 0.35,
                height: height * 0.215,
                backgroundColor: 'grey',
                borderRadius: 20,
              }
            : {
                width: width * 0.28,
                height: height * 0.18,
                backgroundColor: 'grey',
                borderRadius: 20,
              }
        }
      />
      <View style={componentsStyles.priceBox}>
        {book?.name?.length <= 6 ? (
          <Text
            style={{
              fontFamily: Fonts.CREG,
              fontSize: 13,
            }}>
            {book.name}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: Fonts.CREG,
              fontSize: 13,
            }}>
            {book?.name?.substring(0, 6)}...
          </Text>
        )}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={componentsStyles.priceAmountTxt}>{book?.price}</Text>
          <Text style={componentsStyles.priceCurrencyTxt}>E.G</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
