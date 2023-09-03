import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from './custom-theme.json';
const theme = {
  colors: colors,
  sizes: {
    xs: 10,
    s: 12,
    m: 16,
    l: 18,
    xl: 25,
    xxl: 32,
  },
  sizeActivity: {
    xs: 10,
    s: 14,
    m: 18,
    l: 24,
    xl: 28,
    xxl: 32,
  },
  spacing: {
    s: 8,
    m: 13,
    l: 20,
    xl: 30,
    xxl: 40,
  },
  radius: {
    max: 50,
    mid: 30,
    min: 18,
    xmin: 12,
  },
  border: {
    thin: 1,
    thick: 3,
  },
  TypographySize: {
    min: 14,
    mid: 20,
    midBold: 24,
    maxBold: 30,
  },
  fontWight: {
    xs: '200',
    s: '300',
    m: '400',
    l: '500',
    xl: '700',
    xxl: '900',
  },
};
const {width, height} = Dimensions.get('window');
export {width, height, theme, wp, hp};
