import React from 'react';
import { View, Text } from 'react-native';
import { Fonts, width, wp } from 'theme';
import { BOTTOMICON } from 'constants/icons';
import { Input } from '@ui-kitten/components';
import { GradientButton, HeaderApp } from 'components';
import { AuthParamsList } from '../../../navigation/paramsList';
import { StackNavigationProp } from '@react-navigation/stack';
interface Props {
  navigation: StackNavigationProp<AuthParamsList, 'ForgetPassword'>;
}
export const ForgotScreen: React.FC<Props> = ({ navigation }) => {
  const [number, setNumber] = React.useState('');
  return (
    <>
      <HeaderApp hasBack hasIcon={true} backPress={() => navigation.goBack()} />
      <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
        <View style={{marginHorizontal: 15}}>
          <Text
            style={{
              fontFamily: Fonts.CBOLD,
              fontSize: 18,
              color: '#FF0F39',
              marginTop: 32,
              writingDirection: 'rtl',
            }}>
            Did You Forget Your Password?
          </Text>
          <View
            style={{
              width: 29,
              borderBottomWidth: 2,
              borderColor: '#D5D5D5',
              alignSelf: 'flex-end',
              marginTop: 8,
            }}
          />
          <Text
            style={{
              fontFamily: Fonts.CREG,
              fontSize: 13,
              color: '#313131',
              marginTop: 18,
              flexWrap: 'wrap',
              paddingRight: wp(10),
              writingDirection: 'rtl',
            }}>
            There is a long established fact that the readable content of a page
          </Text>
        </View>
        <Input
          value={number}
          keyboardType="number-pad"
          style={{
            width: width / 1.1,
            borderRadius: 18,
            backgroundColor: 'transparnet',
            borderColor: '#E6E6E6',
            alignSelf: 'center',
            marginTop: width / 3,
          }}
          textStyle={{
            fontFamily: Fonts.CREG,
            color: '#DBDBDB',
            fontSize: 13,
            writingDirection: 'rtl',
          }}
          size="large"
          placeholderTextColor="#DBDBDB"
          placeholder="Enter Phone Number"
          onChangeText={nextValue => setNumber(nextValue)}
        />
        <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
          <GradientButton
            buttonName="Send Code"
            onPress={() => {
              //@ts-ignore
              navigation.navigate('verifyPass');
            }}
            loading={false}
            hasIcon={false}
            bR={32}
            pV={16}
            mgT={68}
            buttonWidth={width / 1.1}
            styleText={{
              fontFamily: Fonts.CBOLD,
              fontSize: 15,
              color: '#F6F6F6',
            }}
          />
        </View>
        <BOTTOMICON style={{ left: wp(-15), position: 'absolute', bottom: 10 }} />
      </View>
    </>
  );
};
