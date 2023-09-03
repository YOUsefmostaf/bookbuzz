import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {width, height, Fonts} from 'theme';

export const VendorContainer = ({
  vendor,
  large,
  onPress,
  naming,
  containerStyle,
}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            width: large ? width * 0.45 : width * 0.225,
            backgroundColor: '#E6E6E6',
            height: large ? height * 0.215 : height * 0.1075,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: large ? 20 : 15,
          },
          containerStyle,
        ]}>
        <View
          style={{
            width: large ? width * 0.45 - 30 : width * 0.225 - 15,
            backgroundColor: 'white',
            height: large ? height * 0.215 - 30 : height * 0.1075 - 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: large ? 20 : 15,
          }}>
          <Image
            source={{
              uri: vendor.gravatar,
            }}
            style={{
              width: large ? width * 0.45 - 60 : width * 0.225 - 30,
              backgroundColor: 'white',
              height: large ? height * 0.215 - 60 : height * 0.1075 - 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: large ? 20 : 15,
            }}
          />
        </View>
      </View>
      {naming ? (
        <Text
          style={{
            fontFamily: Fonts.CBOLD,
            // color: AppColors.red,
            color: '#313131',
            fontSize: 14,
            marginHorizontal: width * 0.05,
            textAlign: 'center',
            marginTop: height * 0.01,
          }}>
          {vendor.store_name}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};
