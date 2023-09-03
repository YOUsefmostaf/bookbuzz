import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';

import {width, height, Fonts} from 'theme';

export const AuthorContainer = ({author, onPress, containerStyle}: any) => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          width: width * 0.45,
          marginLeft: width * 0.0333333,
          alignItems: 'center',
        },
        containerStyle,
      ]}
      onPress={onPress}>
      <Image
        source={{
          uri: author.image?.src,
        }}
        style={{
          width: width * 0.15,
          backgroundColor: 'grey',
          height: height * 0.065,
          borderRadius: 8,
          overflow: 'hidden',
        }}
      />
      <Text
        style={{
          fontFamily: Fonts.CREG,
          fontSize: 13,
          color: '#313131',
          marginLeft: width * 0.035,
        }}>
        {author.name}
      </Text>
    </TouchableOpacity>
  );
};
