import React from 'react';
import {LOGOWHITE, FORWARDICON, DRAWER, HEART} from 'constants/icons';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {componentsStyles} from 'components/componentStyles';
import {width, height, Fonts, wp, hp} from 'theme';
import {Circle} from 'react-native-svg';

export const HeaderApp = ({
  hasIcon,
  hasHeart,
  hasBack,
  circ,
  title,
  mt,
  onPress,
  backPress,
  heartPress,
}: any) => {
  return (
    <View style={componentsStyles.headerContainer}>
      <LinearGradient
        colors={['#FF0F39', '#B00523']}
        style={
          circ
            ? {
                ...componentsStyles.header,
                transform: [{scaleX: 2}],
                height: height * 0.25,
                borderBottomStartRadius: 190,
                borderBottomEndRadius: 190,
                overflow: 'hidden',
              }
            : componentsStyles.header
        }>
        <View
          style={
            circ
              ? {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: mt,
                  transform: [{scaleX: 0.5}],
                  flex: 1,
                }
              : {flexDirection: 'row-reverse', alignItems: 'center', marginTop: mt}
          }>
          <TouchableOpacity onPress={onPress}>
            {hasBack ? (
              <FORWARDICON
                onPress={backPress}
                style={{
                  marginRight: width * 0.05,
                  marginLeft: width * 0.02,
                  marginVertical: height * 0.05,
                  transform: [{rotate: '180deg'}],
                }}
                width={wp(4)}
                height={hp(4)}
              />
            ) : (
              <DRAWER
                style={{
                  marginLeft: width * 0.05,
                  marginRight: width * 0.02,
                  marginVertical: height * 0.05,
                }}
              />
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: Fonts.CBOLDEXTRA,
              // marginLeft: width * 0.02,
            }}>
            {title}
          </Text>
        </View>

        {hasIcon ? (
          <LOGOWHITE
            style={{
              marginLeft: width * 0.05,
              marginTop: mt,
            }}
          />
        ) : (
          <></>
        )}

        {hasHeart ? (
          <TouchableOpacity
            onPress={heartPress}
            style={{
              marginTop: mt,
              marginLeft: width * 0.05,
              width: width * 0.1,
              height: width * 0.1,
              borderRadius: width * 0.05,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <HEART />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </LinearGradient>
    </View>
  );
};
