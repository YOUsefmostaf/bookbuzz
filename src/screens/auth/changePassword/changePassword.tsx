import React from 'react';
import {View, Text} from 'react-native';
import {Fonts, width, wp} from 'theme';
import {BOTTOMICON} from 'constants/icons';
import {Input} from '@ui-kitten/components';
import {GradientButton, HeaderApp} from 'components';
import {AuthParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  navigation: StackNavigationProp<AuthParamsList, 'newPass'>;
}
export const ChangePasswordScreen: React.FC<Props> = ({navigation}) => {
  const [number, setNumber] = React.useState('');
  return (
    <>
      <HeaderApp hasIcon={true} hasBack backPress={() => navigation.goBack()} />
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
            Change Password
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
        </View>
        <View style={{marginTop: width / 5}}>
          <Text
            style={{
              color: '#313131',
              fontSize: 13,
              fontFamily: Fonts.CREG,
              marginHorizontal: 25,
              writingDirection: 'rtl',
            }}>
            Password
          </Text>
          <Input
            value={number}
            keyboardType="number-pad"
            style={{
              width: width / 1.1,
              borderRadius: 18,
              backgroundColor: 'transparnet',
              borderColor: '#E6E6E6',
              alignSelf: 'center',
              marginTop: 5,
            }}
            textStyle={{
              fontFamily: Fonts.CREG,
              color: '#DBDBDB',
              fontSize: 13,
              writingDirection: 'rtl',
            }}
            size="large"
            placeholderTextColor="#DBDBDB"
            placeholder="Enter Password"
            onChangeText={nextValue => setNumber(nextValue)}
          />
          <Text
            style={{
              color: '#313131',
              fontSize: 13,
              fontFamily: Fonts.CREG,
              marginTop: 16,
              marginHorizontal: 25,
              writingDirection: 'rtl',
            }}>
            Confirm Password
          </Text>
          <Input
            value={number}
            keyboardType="number-pad"
            style={{
              width: width / 1.1,
              borderRadius: 18,
              backgroundColor: 'transparnet',
              borderColor: '#E6E6E6',
              alignSelf: 'center',
              marginTop: 5,
            }}
            textStyle={{
              fontFamily: Fonts.CREG,
              color: '#DBDBDB',
              fontSize: 13,
              writingDirection: 'rtl',
            }}
            size="large"
            placeholderTextColor="#DBDBDB"
            placeholder="Enter Password"
            onChangeText={nextValue => setNumber(nextValue)}
          />
        </View>
        <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
          <GradientButton
            buttonName="Confirm"
            onPress={() => {
              //@ts-ignore
              navigation.navigate('Login');
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
        <BOTTOMICON style={{left: wp(-15), position: 'absolute', bottom: 10}} />
      </View>
    </>
  );
};
