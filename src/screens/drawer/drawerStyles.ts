import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {Fonts, height, hp, theme, width, wp} from 'theme';

const Settings = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: height,
  },
  bookImg: {
    width: width * 0.346,
    height: height * 0.0763,
    marginTop: hp(5),
  },
  desc: {
    // width: width * 0.9,
    height: height * 0.233,
    paddingTop: hp(5),
    paddingHorizontal: hp(5),

  },
  descText: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#313131',
    fontFamily: Fonts.CLIGHT,
  },
  social: {
    paddingTop: hp(5),
    flexDirection: 'row',
  },
  socialText: {
    fontFamily: Fonts.CBLACK,
    paddingTop: hp(5),
    color: '#FF0F39',
    fontSize: normalize(18),
    fontWeight: '400',
  },
  icon: {
    width: width * 0.085,
    height: height * 0.0394,
    backgroundColor: '#313131',
    marginHorizontal: wp(1),
    borderRadius: normalize(100),
    flexDirection: 'row',
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export const DrawerStyles = {Settings: Settings};
export default DrawerStyles;
