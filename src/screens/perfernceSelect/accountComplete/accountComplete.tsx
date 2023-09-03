import React from 'react';
import {PerfSelectParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {GradientButton, HeaderApp} from 'components';
import {View, Text} from 'react-native';
import {Fonts, width, wp} from 'theme';
import tron from 'reactotron-react-native';
import {
  getCategoryAuthors,
  getCategoryIntrest,
  getCategoryLang,
  selectLangCate,
  getArabicAuthor,
  getEnglishAuthor,
  getTransAuthor,
} from 'store/categories';
import {batch, useDispatch, useSelector} from 'react-redux';

interface Props {
  navigation: StackNavigationProp<PerfSelectParamsList, 'RegisterComplete'>;
}
export const AccountCompleteScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const lang = useSelector(selectLangCate);
  React.useEffect(() => {
    batch(() => {
      dispatch(getCategoryLang({params: {slug: 'language'}}));
      dispatch(getCategoryIntrest({params: {slug: 'intrest'}}));
      dispatch(getCategoryAuthors({params: {slug: 'author'}}));

      dispatch(getArabicAuthor({params: {parent: 5411}}));
      dispatch(getEnglishAuthor({params: {parent: 5859}}));
      dispatch(getTransAuthor({params: {parent: 5509}}));
    });
  }, [dispatch]);
  //@ts-ignore
  tron.logImportant('lang', lang);
  return (
    <>
      <HeaderApp hasBack hasIcon={true} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F6F6F6',
        }}>
        <Text
          style={{
            fontFamily: Fonts.CBOLD,
            fontSize: 18,
            color: '#FF0F39',
            marginTop: wp(30),
            marginHorizontal: 15,
            writingDirection: 'rtl',
          }}>
          تم تفعيل الحساب !
        </Text>
        <Text
          style={{
            fontFamily: Fonts.CREG,
            fontSize: 13,
            color: '#313131',
            marginTop: 18,
            flexWrap: 'wrap',
            paddingLeft: wp(10),
            marginHorizontal: 15,
            writingDirection: 'rtl',
          }}>
          هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة
        </Text>
        <GradientButton
          buttonName="إختر إهتمامتك"
          onPress={() => {
            navigation.navigate('LangSelect');
          }}
          loading={false}
          hasIcon={false}
          bR={32}
          pV={16}
          mgT={wp(40)}
          buttonWidth={width / 1.1}
          styleText={{
            fontFamily: Fonts.CBOLD,
            fontSize: 15,
            color: '#F6F6F6',
          }}
        />
      </View>
    </>
  );
};
