import {Input} from '@ui-kitten/components';
import * as React from 'react';
import {Text} from 'react-native';
import {Fonts, width} from 'theme';

interface InputProps {
  text: string;
  input: string | undefined;
  onChnage: (...arg: any | undefined) => void;
  placeholder: string;
  name: string | undefined;
  keyboardType: string;
}

export const AppInput: React.FC<InputProps> = props => {
  return (
    <>
      <Text
        style={{
          color: '#313131',
          fontSize: 13,
          fontFamily: Fonts.CREG,
          marginTop: 16,
          writingDirection: 'rtl',
        }}>
        {props.text}
      </Text>
      <Input
        value={props.input}
        style={{
          width: width / 1.01,
          borderRadius: 32,
          paddingHorizontal: 16,
          backgroundColor: '#FCFCFC',
          borderColor: '#E6E6E6',
          alignSelf: 'center',
          marginTop: 5,
        }}
        textStyle={{
          fontFamily: Fonts.CREG,
          color: '#313131',
          fontSize: 13,
          writingDirection: 'rtl',
        }}
        size="large"
        placeholderTextColor="#DBDBDB"
        placeholder={props.placeholder}
        onChangeText={nextValue => props.onChnage(nextValue, props.name)}
        keyboardType={props?.keyboardType ? props.keyboardType : 'default'}
      />
    </>
  );
};

export default AppInput;
