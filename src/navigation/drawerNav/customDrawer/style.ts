import {StyleSheet} from 'react-native';
import {width} from 'theme';
// import Fonts from 'theme/fonts';
// import {wp} from '../../../theme/style';
export const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  badge: {
    width: 15,
    height: 15,
    backgroundColor: '#AF3535',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 90,
    top: 10,
    left: 4,
    zIndex: 9999,
  },
  // title: {
  //   fontFamily: Fonts.Regular,
  //   top: 5,
  //   color: '#F8F9FC',
  //   width: wp(27),
  // },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
  },
  bottomDrawerSection1: {
    marginBottom: 15,
    marginTop: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerDiv: {
    backgroundColor: '#061721',
    width: width,
  },
});
