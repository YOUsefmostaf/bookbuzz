import {Dimensions, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {AppColors, Fonts, height, width} from 'theme';
import {height as h, width as w, wp, hp, theme} from 'theme';

export const FilterStyles = StyleSheet.create({
  FilterScreen: {
    backgroundColor: theme.colors['color-primary-active'],
    height: h,
  },
  selectedItemHshow: {
    backgroundColor: '#FF0F39',
    paddingVertical: wp(5),
    paddingHorizontal: hp(2),
    borderRadius: 18,
    marginVertical: hp(1),
    marginHorizontal: wp(2),
    color: 'white',
    fontSize: 17,
    width: w * 0.2,
  },

  selectedItem: {
    backgroundColor: '#FF0F39',
    paddingVertical: wp(3),
    paddingHorizontal: hp(2),
    borderRadius: 18,
    marginVertical: hp(1),
    marginHorizontal: wp(2),
    color: 'white',
  },
  filterText: {
    color: '#313131',
    fontSize: theme.sizes.m,
    fontFamily: Fonts.CREG,
    marginTop: hp(3),
    marginRight: w * 0.05,
  },
  filterInput: {
    justifyContent: 'space-between',
    paddingLeft: wp(4),
    width: width / 1.1,
    borderRadius: 18,
    backgroundColor: 'transparnet',
    borderColor: '#E6E6E6',
    alignSelf: 'center',
    marginTop: 5,
  },
  filterTextInput: {
    fontFamily: Fonts.CREG,
    color: '#313131',
    fontSize: 13,
  },
  bottomModal: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -20,
    direction: 'rtl',
    width: w,
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
  },
  PrimaryText500: {
    fontFamily: Fonts.CBOLD,
    fontSize: 18,
    color: '#FF0F39',
  },
  filterCheckBoxItem: {
    flexDirection: 'row',
    marginTop: 36,
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
export const Profile = StyleSheet.create({
  profile: {
    backgroundColor: '#F6F6F6',
    height: height,
  },
  HeaderIcon: {
    marginRight: width * 0.05,
    marginTop: 0,
  },
  title: {
    color: '#313131',
    fontSize: theme.sizes.m,
    fontFamily: Fonts.CREG,
    marginTop: hp(3),
    marginRight: width * 0.05,
  },
  editPassContainer: {
    backgroundColor: '#F6F6F6',
    height: height,
  },
  editPassButton: {
    backgroundColor: '#FF0F39',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileEditIcon: {
    backgroundColor: 'white',
    padding: normalize(8),
    borderRadius: normalize(50),
  },
  loayltyPoints: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    height: hp(12),
    width: width / 1.1,
    paddingHorizontal: 24,
    marginTop: hp(2),
  },
  LoyaltyPointsTxt: {
    fontFamily: Fonts.CBOLD,
    fontSize: normalize(16),
    color: '#FFFFFF',
    textAlign:'left'
  },
  loyaltyPointsNum: {
    fontFamily: Fonts.CBOLD,
    fontSize: normalize(16),
    color: '#FFFFFF',
  },
  ProfileImage: {
    backgroundColor: '#AAAAAA',
    width: width * 0.25,
    height: height * 0.12,
    borderRadius: normalize(15),
  },
  ProfileUserName: {
    color: '#313131',
    fontSize: normalize(18),
    marginTop: normalize(40),
    fontWeight: 'bold',
  },
  InputValue: {
    justifyContent: 'space-between',
    paddingLeft: wp(4),
    width: width / 1.1,
    borderRadius: 18,
    backgroundColor: '#FCFCFC',
    borderColor: '#E6E6E6',
    alignSelf: 'center',
    marginTop: hp(2),
    color: '#313131',
    paddingVertical: hp(2),
  },
  InputText: {
    color: '#313131',
    fontSize: theme.sizes.m,
    fontFamily: Fonts.CREG,
    marginTop: hp(3),
    marginRight: w * 0.05,
  },
  EditImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  EditProfileImage: {
    position: 'absolute',
    top: hp(8),
    alignSelf: 'center',
  },
});
