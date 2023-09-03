import React from 'react';

import {View, Text} from 'react-native';
import {AuthParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {GradientButton, HeaderApp} from 'components';
import {styleCodeInput} from '../authStyles';
import {useDispatch} from 'react-redux';
import {setComplete} from 'store/auth';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Fonts, width, wp} from 'theme';
const CELL_COUNT = 4;
interface Props {
  navigation: StackNavigationProp<AuthParamsList, 'verifyPass'>;
}

export const VerifyPasswordScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <>
      <HeaderApp hasIcon={true} backPress={() => navigation.goBack()} />
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
            A Message Has Been Sent To The Mobile Number
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
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={{marginTop: wp(30)}}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[
                styleCodeInput.cell,
                isFocused && styleCodeInput.focusCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Text
          style={{
            fontFamily: Fonts.CBOLD,
            color: '#FF0F39',
            fontSize: 13,
            marginTop: 46,
            textDecorationLine: 'underline',
            textDecorationColor: '#FF0F39',
            marginHorizontal: 20,
            writingDirection: 'rtl',
          }}>
          Resend The Code
        </Text>
        <GradientButton
          buttonName="Change Password"
          onPress={() => {
            navigation.navigate('newPass');
          }}
          loading={false}
          hasIcon={false}
          bR={32}
          pV={16}
          mgT={55}
          buttonWidth={width / 1.1}
          styleText={{
            fontFamily: Fonts.CBOLD,
            fontSize: 15,
            color: '#F6F6F6',
          }}
        />
      </View>
    </>
  );
};
