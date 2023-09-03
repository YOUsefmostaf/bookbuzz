import React from 'react';
import {View, Text} from 'react-native';
import normalize from 'react-native-normalize';
import {Fonts, width} from 'theme';
import {useNavigation} from '@react-navigation/native';
import {GradientButton} from 'components';

export const OrderFail = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: Fonts.CBOLD,
          fontSize: normalize(20),
          color: '#FF0F39',
        }}>
        فشلت العملية الرجاء اعادة المحاولة!!!
      </Text>
      <GradientButton
        onPress={() => {
          //@ts-ignore
          navigation.navigate('Cart');
        }}
        buttonName="العودة"
        hasIcon={false}
        bR={32}
        pV={16}
        mgT={50}
        mgB={50}
        buttonWidth={width / 1.1}
        styleText={{
          fontFamily: Fonts.CBOLD,
          fontSize: normalize(15),
          color: '#F6F6F6',
        }}
      />
    </View>
  );
};
