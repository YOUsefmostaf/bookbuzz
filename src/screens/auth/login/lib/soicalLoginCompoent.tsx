import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FACE, GOOGLE, APPLE} from 'constants/icons';
import {height, width} from 'theme';

export const SocialLogin = ({google, facebook}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 52,
        marginBottom: 10,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#313131',
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          width: width / 3.5,
          height: height / 17.5,
          marginRight: 12,
        }}>
        <APPLE />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={google}
        style={{
          backgroundColor: '#313131',
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          width: width / 3.5,
          height: height / 17.5,
        }}>
        <GOOGLE />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={facebook}
        style={{
          backgroundColor: '#313131',
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          width: width / 3.5,
          height: height / 17.5,
          marginLeft: 12,
        }}>
        <FACE />
      </TouchableOpacity>
    </View>
  );
};
