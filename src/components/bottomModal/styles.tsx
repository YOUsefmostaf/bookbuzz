import {StyleSheet} from 'react-native';
import {
  theme,
  height as h,
  width as w,
  wp,
  hp,
  Fonts,
  width,
  height,
} from 'theme';

export const FilterStyles = StyleSheet.create({
  bottomModal: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -20,
    direction: 'rtl',
    width: w,
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    height: height * 0.5,
  },
  PrimaryText500: {
    fontFamily: Fonts.CBOLD,
    fontSize: 18,
    color: '#FF0F39',
  },
  filterCheckBoxItem: {
    flexDirection: 'row',
    marginTop: 36,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterCheckBoxAuther: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterCheckBoxText: {
    color: '#313131',
    fontSize: 13,
    fontFamily: Fonts.CREG,
  },
  filterBoxIcon: {
    color: '#313131',
    borderRadius: 10,
  },
  filterBoxIconSelected: {
    color: '#FF0F39',
    borderRadius: 10,
  },
  filterBoxImage: {
    backgroundColor: 'grey',
    width: width * 0.14,
    height: height * 0.0603,
    overflow: 'hidden',
    borderRadius: 7,
    marginRight: 16,
  },
  filterAuthersScroll: {
    height: h * 0.5,
  },
});
