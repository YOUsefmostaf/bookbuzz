import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {width} from 'theme';

export const GradientButton = ({
  buttonName,
  onPress,
  accissible,
  loading,
  hasIcon,
  bR,
  pV,
  buttonWidth,
  styleText,
  childern,
  mgT,
  mgB,
  mH,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={accissible}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <LinearGradient
        colors={['#F20D35', '#E10B31', '#D30A2D', '#C00828', '#B10624']}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: bR,
          paddingVertical: pV,
          width: buttonWidth,
          marginTop: mgT,
          marginBottom: mgB,
          marginHorizontal: mH,
        }}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={styleText}>{buttonName}</Text>
            {hasIcon ? childern : null}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
