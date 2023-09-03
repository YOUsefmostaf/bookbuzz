import {Platform} from 'react-native';

export const Fonts = {
  Bold:
    Platform.OS === 'ios'
      ? 'alfont_com_AlFont_com_18728-arabicmodern-bold-1'
      : 'alfont_com_AlFont_com_18728-arabicmodern-bold-1',
  CBLACK: Platform.OS === 'ios' ? 'Cairo-Black' : 'Cairo-Black',
  CBOLD: Platform.OS === 'ios' ? 'Cairo-Bold' : 'Cairo-Bold',
  CBOLDEXTRA: Platform.OS === 'ios' ? 'Cairo-ExtraBold' : 'Cairo-ExtraBold',
  CLIGHTEXTRA: Platform.OS === 'ios' ? 'Cairo-ExtraLight' : 'Cairo-ExtraLight',
  CLIGHT: Platform.OS === 'ios' ? 'Cairo-Light' : 'Cairo-Light',
  CMID: Platform.OS === 'ios' ? 'Cairo-Medium' : 'Cairo-Medium',
  CREG: Platform.OS === 'ios' ? 'Cairo-Regular' : 'Cairo-Regular',
  CSEMIBOLD: Platform.OS === 'ios' ? 'Cairo-SemiBold' : 'Cairo-SemiBold',
};
