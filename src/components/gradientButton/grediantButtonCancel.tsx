import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientButtonCancel = ({
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
        colors={['#313131', '#313131']}
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
