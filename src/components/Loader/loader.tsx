import React from 'react';
import {ImageBackground} from 'react-native';
import Spinner from 'react-native-spinkit';
import {height, width, wp} from 'theme';
export const Loader = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/launch_screen.png')}
      style={{
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <Spinner
        style={{
          // position: 'absolute',
          transform: [{scaleX: 1}],
          alignSelf: 'center',
          zIndex: 100,
          marginBottom: wp(10),
        }}
        isVisible={true}
        size={70}
        type="ThreeBounce"
        color="#FFFFFF"
      />
    </ImageBackground>
  );
};
