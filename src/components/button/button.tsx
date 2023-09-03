import React from 'react';

import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ColorValue,
} from 'react-native';
import {Fonts} from 'theme';

interface Props {
  colorBG: ColorValue | undefined;
  staticWD: string | number | undefined;
  childText: any;
  Br: number | undefined;
  HG: string | number | undefined;
  mgT: string | number | undefined;
  onPress: any;
  disabled: boolean | null | undefined;
  loading: boolean;
}

export const AdButton: React.FC<Props> = React.memo(props => {
  console.log('button render');
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={{
        backgroundColor: props.colorBG,
        width: props.staticWD,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: props.Br,
        height: props.HG,
        marginTop: props.mgT,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
      }}>
      {props.loading ? (
        <ActivityIndicator color="#ffff" />
      ) : (
        <Text
          style={{
            fontFamily: Fonts.CBOLD,
            fontSize: 15,
            color: '#FCFCFC',
          }}>
          {props.childText}
        </Text>
      )}
    </TouchableOpacity>
  );
});
